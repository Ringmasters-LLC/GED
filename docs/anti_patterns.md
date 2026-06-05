# Anti-Patterns

## 1. The Dummy Zip Code
Forcing "00000" or "none" in territories that do not use postal codes.
**Fix**: Use `postalCode.used` to hide the field.

## 2. The Hardcoded "State" Label
Using "State" globally when "Province", "Prefecture", "County", or "Emirate" is appropriate.
**Fix**: Use `address.administrativeAreaLabel`.

## 3. The Mandatory First/Last Name
Requiring two name fields when many users have a single legal name.
**Fix**: Use `name.supportsSingleName`.

## 4. The "+1 is USA" Assumption
Automatically setting the country to United States when a user enters +1.
**Fix**: Use `getCountriesByCallingCode` and prompt the user.

## 5. The Small-to-Large Form Layout
Hardcoding Street -> City -> Zip when the target country expects Country -> City -> Street.
**Fix**: Use `address.order` to reorder fields.

## 6. The "Valid if Regex Passes" Fallacy
Assuming a postal code is "valid" just because it matches a pattern, ignoring if the country actually uses them for that use case.
**Fix**: Check `postalCode.requiredForConsumerForms`.
