-- Widen the currency dimension to include AED (Gulf / UAE market).
-- Extends 0009's USD/EUR CHECK. No data change; existing rows keep their currency.

ALTER TABLE pools DROP CONSTRAINT IF EXISTS pools_currency_check;
ALTER TABLE pools ADD CONSTRAINT pools_currency_check
    CHECK (currency IN ('USD', 'EUR', 'AED'));
