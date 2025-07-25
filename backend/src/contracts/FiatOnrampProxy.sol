// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title FiatOnrampProxy
/// @notice Handles fiat on-ramp deposits and collects a platform fee of 2.5%.
/// @dev This contract is intended to be used by a trusted on-ramp service to deposit
/// funds into user wallets while automatically collecting the platform fee.
contract FiatOnrampProxy is Ownable {
    /// @notice Fee amount in basis points. 250 = 2.5%
    uint256 public feeBasisPoints = 250;
    /// @notice Address that receives the platform fee.
    address public feeRecipient;

    /// @notice Emitted when a deposit is processed.
    /// @param payer The address that paid the tokens (on-ramp operator).
    /// @param user The user receiving the net deposit.
    /// @param netAmount The amount delivered to the user after the fee.
    /// @param feeAmount The fee amount collected by the platform.
    event OnRamp(
        address indexed payer,
        address indexed user,
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

    /// @notice Processes a fiat on-ramp deposit by forwarding funds from the payer to the user
    /// while retaining a 2.5% platform fee. The payer must approve this contract to spend `amount` tokens.
    /// @param token The ERC20 token address (e.g. USDC).
    /// @param user The user receiving the deposit.
    /// @param amount The total amount being deposited (inclusive of fee).
    function onRamp(address token, address user, uint256 amount) external {
        require(amount > 0, "Amount must be positive");
        require(user != address(0), "Invalid user address");
        IERC20 erc20 = IERC20(token);

        // Calculate fee and net amount.
        uint256 fee = (amount * feeBasisPoints) / 10000;
        uint256 net = amount - fee;

        // Transfer fee to the feeRecipient.
        require(
            erc20.transferFrom(msg.sender, feeRecipient, fee),
            "Fee transfer failed"
        );
        // Transfer net amount to user.
        require(
            erc20.transferFrom(msg.sender, user, net),
            "Deposit transfer failed"
        );

        emit OnRamp(msg.sender, user, net, fee);
    }
}