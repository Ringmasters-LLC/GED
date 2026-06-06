# Global Entry Philosophy

Most global forms are domestic assumptions with international patches. This project starts from global variance first.

## Core Concepts

### 1. The Synthesis Layer

Normalize complex upstream standards (CLDR, libaddressinput, libphonenumber) into human-readable developer behavior. We do not expose raw complexity; we expose product intent.

### 2. Integration over Ownership

Use domain authorities where they exist (e.g., ISO, Google, WMO). Do not own the "truth"—own the integration and normalization for developers.

### 3. No US-Default Address Model

Do not assume every address has a "State" or "Zip Code". US structures are the exception, not the rule.

### 2. No Forced Postal-Code Requirement

Many territories (e.g., Hong Kong, UAE) do not use postal codes for domestic delivery. Forcing a dummy "00000" is a failure.

### 3. No Forced Administrative Area

Many countries do not require a state, province, or region for valid delivery or entry.

### 4. No Name Assumptions

"First Name" and "Last Name" fail for many cultures. Support single names, patronymics, and varied ordering.

### 5. Territory != Sovereign Country

Territories like Puerto Rico or Hong Kong have distinct entry rules despite sovereign status.

### 6. One Calling Code, Many Territories

Calling code "+1" is shared by dozens of distinct territories with different address formats.

### 7. Address Order Variance

Western "Small to Large" (Street -> City -> Country) is reversed in many Eastern cultures (Country -> City -> Street).

### 8. Use-Case Strictness

A shipping form needs stricter validation than a marketing CRM. Validation is context-dependent.

### 9. Explicit Confidence

If data is derived or uncertain, mark it. Do not present uncertainty as certainty.

### 10. Data over Opinion

Every rule must map to source metadata.
