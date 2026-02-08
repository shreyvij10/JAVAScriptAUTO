const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testDataForOrder:
        {
            username: "shreyashish1101@gmail.com",
            password: "800386@As",
            productName: "ZARA COAT 3"
        }

    }
);