// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title WithdrawProxy
/// @notice Allows creators to withdraw their earnings while collecting a platform fee.
/// @dev Similar to TipProxy but designed for withdrawals initiated by the creator.
contract WithdrawProxy is Ownable {
    /// @notice Fee amount in basis points (1/100th of a percent). 350 = 3.5%
    uint256 public feeBasisPoints = 350;
    /// @notice The address that receives the platform fee.
    address public feeRecipient;

    /// @notice Emitted when a withdrawal is executed.
    /// @param creator The address initiating the withdrawal.
    /// @param to The final recipient address of the funds.
    /// @param netAmount The amount sent to the recipient after fee deduction.
    /// @param feeAmount The fee amount collected by the platform.
    event Withdrawn(
        address indexed creator,
        address indexed to,
        uint256 netAmount,
        uint256 feeAmount
    );

    /// @param _feeRecipient The initial fee recipient address.
    constructor(address _feeRecipient) {
        require(_feeRecipient != address(0), "Invalid fee recipient");
        feeRecipient = _feeRecipient;
    }

    /// @notice Updates the fee recipient address. Only the contract owner can call this.
    /// @param _recipient The new fee recipient address.
    function setFeeRecipient(address _recipient) external onlyOwner {
        require(_recipient != address(0), "Invalid fee recipient");
        feeRecipient = _recipient;
    }

    /// @notice Allows a creator to withdraw a given ERC20 token with a platform fee.
    /// The caller must approve this contract to spend `amount` tokens beforehand.
    /// @param token The ERC20 token address.
    /// @param amount The total amount to withdraw (inclusive of fee).
    /// @param to The address receiving the net amount.
    function withdraw(address token, uint256 amount, address to) external {
        require(amount > 0, "Amount must be positive");
        require(to != address(0), "Invalid recipient");
        IERC20 erc20 = IERC20(token);

        // Calculate fee and net amount.
        uint256 fee = (amount * feeBasisPoints) / 10000;
        uint256 net = amount - fee;

        // Transfer fee to the feeRecipient.
        require(
            erc20.transferFrom(msg.sender, feeRecipient, fee),
            "Fee transfer failed"
        );
        // Transfer net amount to the specified recipient address.
        require(
            erc20.transferFrom(msg.sender, to, net),
            "Withdraw transfer failed"
        );

        emit Withdrawn(msg.sender, to, net, fee);
    }
}