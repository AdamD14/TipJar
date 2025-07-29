// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title TipProxy
/// @notice Smart contract to forward tips to creators while collecting a platform fee.
/// @dev The fee is expressed in basis points (1/100th of a percent). Default is 350 (3.5%).
contract TipProxy is Ownable {
    /// @notice Fee amount in basis points (1/100th of a percent). 350 = 3.5%
    uint256 public feeBasisPoints = 350;
    /// @notice The address that receives the platform fee.
    address public feeRecipient;

    /// @notice Emitted when a tip is successfully forwarded.
    /// @param from The address of the tipper.
    /// @param creator The address of the creator receiving the net tip.
    /// @param netAmount The amount sent to the creator after fee deduction.
    /// @param feeAmount The fee amount collected by the platform.
    event Tipped(
        address indexed from,
        address indexed creator,
        uint256 netAmount,
        uint256 feeAmount
    );

    /// @param _feeRecipient The initial address that will receive the fees.
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

    /// @notice Sends a tip in a given ERC20 token to a creator while collecting the platform fee.
    /// The tipper must approve this contract to spend `amount` tokens beforehand.
    /// @param token The ERC20 token address.
    /// @param creator The address of the creator receiving the tip.
    /// @param amount The total amount of tokens being tipped (inclusive of fee).
    function tip(address token, address creator, uint256 amount) external {
        require(amount > 0, "Amount must be positive");
        require(creator != address(0), "Invalid creator address");
        IERC20 erc20 = IERC20(token);

        // Calculate fee and net amount.
        uint256 fee = (amount * feeBasisPoints) / 10000;
        uint256 net = amount - fee;

        // Transfer fee to feeRecipient.
        require(
            erc20.transferFrom(msg.sender, feeRecipient, fee),
            "Fee transfer failed"
        );
        // Transfer net amount to creator.
        require(
            erc20.transferFrom(msg.sender, creator, net),
            "Tip transfer failed"
        );

        emit Tipped(msg.sender, creator, net, fee);
    }
}