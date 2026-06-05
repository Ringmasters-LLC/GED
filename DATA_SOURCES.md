# Data Sources

This document tracks the upstream sources used to generate the canonical datasets.

## Primary Sources

### 1. ISO 3166 (Country Codes)
- **Use**: Base country lists, ISO2 codes.
- **License**: Varies / Public compatibility.

### 2. CLDR (Common Locale Data Repository)
- **Use**: Locale formatting, languages, currencies, territory types.
- **License**: Unicode Terms of Use.
- **URL**: https://cldr.unicode.org/

### 3. Google libphonenumber
- **Use**: E.164 calling codes, phone formatting rules.
- **License**: Apache 2.0.
- **URL**: https://github.com/google/libphonenumber

### 4. GeoNames
- **Use**: Postal code formats, subdivision data.
- **License**: CC BY 4.0.
- **URL**: https://www.geonames.org/

## Update Policy
Data is refreshed monthly via automated ingestion scripts. Manual review is applied to resolve conflicts or gaps.
