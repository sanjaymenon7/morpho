/**
 * Created by Sanjay on 09-11-2015.
 */
var exports = module.exports = {};

var pg = require("pg");

/*
 * Database connection string
 * Replace "postgres" with your dbms username.
 * Replace "root" with your dbms password
 * Replace "localhost:5432" with your postgreSQL server and port
 * Replace "seba" with your database name
 */   
var conString = "pg://postgres:root@localhost:5432/seba";

var client = new pg.Client(conString);
client.connect();


var query = client.query("SELECT * FROM MOBILEDATA");
query.on("row", function (row, result) {
    result.addRow(row);
});
query.on("end", function (result) {
    exports.foneSpecs = JSON.stringify(result.rows, null, "    ");
    console.log(exports.foneSpecs);
    client.end();
});

exports.phoneSpecs =

    [
        {
            "CompanyName":"OnePlus",
            "PhoneName":"One",
            "OperatingSystem":"Android (5.1)",
            "PhysicalSize":"5.5 inches",
            "Resolution":"1080 x 1920 pixels",
            "PixelDensity":"401 ppi",
            "Camera":"13 megapixels",
            "FrontCamera":"5 megapixels",
            "Processor":"Quad-core",
            "ClockRate":"2500 MHz",
            "SystemMemory":"3072 MB RAM",
            "BuiltinStorage":"64 GB",
            "BatteryCapacity":"3100 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"micro"
        },
        {
            "CompanyName":"Motorola",
            "PhoneName":"Moto X",
            "OperatingSystem":"Android (5.1)",
            "PhysicalSize":"5.5 inches",
            "Resolution":"1080 x 1920 pixels",
            "PixelDensity":"403 ppi",
            "Camera":"21 megapixels",
            "FrontCamera":"5 megapixels",
            "Processor":"Octa-core",
            "ClockRate":"1700 MHz",
            "SystemMemory":"2048 MB RAM",
            "BuiltinStorage":"32 GB",
            "BatteryCapacity":"3630 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"nano"
        },
        {
            "CompanyName":"Asus",
            "PhoneName":"Zenfone 2",
            "OperatingSystem":"Android (5.0)",
            "PhysicalSize":"5.5 inches",
            "Resolution":"720 x 1280 pixels",
            "PixelDensity":"265 ppi",
            "Camera":"13 megapixels",
            "FrontCamera":"5 megapixels",
            "Processor":"Quad-core",
            "ClockRate":"1200 MHz",
            "SystemMemory":"2048 MB RAM",
            "BuiltinStorage":"16 GB",
            "BatteryCapacity":"3000 mAh",
            "MultipleSIMCards":1,
            "SIMCard":"micro"
        },
        {
            "CompanyName":"Samsung",
            "PhoneName":"Galaxy S5",
            "OperatingSystem":"Android (5.0)",
            "PhysicalSize":"5.1 inches",
            "Resolution":"1080 x 1920 pixels",
            "PixelDensity":"432 ppi",
            "Camera":"16 megapixels",
            "FrontCamera":"2.1 megapixels",
            "Processor":"Quad-core",
            "ClockRate":"2500 MHz",
            "SystemMemory":"2048 MB RAM",
            "BuiltinStorage":"32 GB",
            "BatteryCapacity":"2800 mAh",
            "MultipleSIM ards":0,
            "SIMCard":"micro"
        },
        {
            "CompanyName":"Samsung",
            "PhoneName":"Galaxy A8",
            "OperatingSystem":"Android (5.1)",
            "PhysicalSize":"5.7 inches",
            "Resolution":"1080 x 1920 pixels",
            "PixelDensity":"386 ppi",
            "Camera":"16 megapixels",
            "FrontCamera":"5 megapixels",
            "Processor":"Octa-core",
            "Clock Rate":"1500 MHz",
            "SystemMemory":"2048 MB RAM",
            "BuiltinStorage":"32 GB",
            "BatteryCapacity":"3050 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"nano"
        },
        {
            "CompanyName":"Samsung",
            "PhoneName":"Z3",
            "OperatingSystem":"Tizen (2.3)",
            "PhysicalSize":"5.0 inches",
            "Resolution":"720 x 1280 pixels",
            "PixelDensity":"294 ppi",
            "Camera":"8 megapixels",
            "FrontCamera":"5 megapixels",
            "Processor":"Quad-core",
            "Clock Rate":"1300 MHz",
            "SystemMemory":"1024 MB RAM",
            "BuiltinStorage":"8 GB",
            "BatteryCapacity":"2600 mAh",
            "MultipleSIMCards":1,
            "SIMCard":"normal"
        },
        {
            "CompanyName":"Samsung",
            "PhoneName":"Galaxy J5",
            "OperatingSystem":"Android (5.0)",
            "PhysicalSize":"5.0 inches",
            "Resolution":"720 x 1280 pixels",
            "PixelDensity":"294 ppi",
            "Camera":"13 megapixels",
            "FrontCamera":"5 megapixels",
            "Processor":"Quad-core",
            "Clock Rate":"1200 MHz",
            "SystemMemory":"1536 MB RAM",
            "BuiltinStorage":"8 GB",
            "BatteryCapacity":"2600 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"micro"
        },
        {
            "CompanyName":"Samsung",
            "PhoneName":"Galaxy Grand Neo Plus",
            "OperatingSystem":"Android (4.0)",
            "PhysicalSize":"5.0 inches",
            "Resolution":"480 x 800 pixels",
            "PixelDensity":"187 ppi",
            "Camera":"5 megapixels",
            "FrontCamera":"2 megapixels",
            "Processor":"Quad-core",
            "Clock Rate":"1200 MHz",
            "SystemMemory":"1024 MB RAM",
            "BuiltinStorage":"8 GB",
            "BatteryCapacity":"2100 mAh",
            "MultipleSIMCards":1,
            "SIMCard":"normal"
        },
        {
            "CompanyName":"Samsung",
            "PhoneName":"Galaxy Note 5",
            "OperatingSystem":"Android (5.1)",
            "PhysicalSize":"5.7 inches",
            "Resolution":"1440 x 2560 pixels",
            "PixelDensity":"518 ppi",
            "Camera":"16 megapixels",
            "FrontCamera":"5 megapixels",
            "Processor":"Octa-core",
            "Clock Rate":"2100 MHz",
            "SystemMemory":"4096 MB RAM",
            "BuiltinStorage":"64 GB",
            "BatteryCapacity":"3000 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"nano"
        },
        {
            "CompanyName":"OnePlus",
            "PhoneName":"X",
            "OperatingSystem":"Android (5.1)",
            "PhysicalSize":"5.0 inches",
            "Resolution":"1080 x 1920 pixels",
            "PixelDensity":"441 ppi",
            "Camera":"13 megapixels",
            "FrontCamera":"8 megapixels",
            "Processor":"Quad-core",
            "Clock Rate":"2300 MHz",
            "SystemMemory":"3072 MB RAM",
            "BuiltinStorage":"16 GB",
            "BatteryCapacity":"2525 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"nano"
        },
        {
            "CompanyName":"Samsung",
            "PhoneName":"Galaxy S6",
            "OperatingSystem":"Android (5.1)",
            "PhysicalSize":"5.1 inches",
            "Resolution":"1440 x 2560 pixels",
            "PixelDensity":"577 ppi",
            "Camera":"16 megapixels",
            "FrontCamera":"5 megapixels",
            "Processor":"Octa-core",
            "Clock Rate":"2100 MHz",
            "SystemMemory":"3072 MB RAM",
            "BuiltinStorage":"128 GB",
            "BatteryCapacity":"2550 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"nano"
        },
        {
            "CompanyName":"Motorola",
            "PhoneName":"Nexus 6",
            "OperatingSystem":"Android (5.1)",
            "PhysicalSize":"6.0 inches",
            "Resolution":"1440 x 2560 pixels",
            "PixelDensity":"493 ppi",
            "Camera":"13 megapixels",
            "FrontCamera":"2 megapixels",
            "Processor":"Quad-core",
            "Clock Rate":"2700 MHz",
            "SystemMemory":"3072 MB RAM",
            "BuiltinStorage":"64 GB",
            "BatteryCapacity":"3220 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"nano"
        },
        {
            "CompanyName":"Sony",
            "PhoneName":"Xperia Z5 Compact",
            "OperatingSystem":"Android (5.1)",
            "PhysicalSize":"4.6 inches",
            "Resolution":"720 x 1280 pixels",
            "PixelDensity":"319 ppi",
            "Camera":"23 megapixels",
            "FrontCamera":"5 megapixels",
            "Processor":"Octa-core",
            "Clock Rate":"2000 MHz",
            "SystemMemory":"2048 MB RAM",
            "BuiltinStorage":"32 GB",
            "BatteryCapacity":"2700 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"nano"
        },
        {
            "CompanyName":"Sony",
            "PhoneName":"Xperia Z5 Premium",
            "OperatingSystem":"Android (5.1)",
            "PhysicalSize":"5.5 inches",
            "Resolution":"2160 x 3840 pixels",
            "PixelDensity":"801 ppi",
            "Camera":"23 megapixels",
            "FrontCamera":"5 megapixels",
            "Processor":"Octa-core",
            "Clock Rate":"2000 MHz",
            "SystemMemory":"3072 MB RAM",
            "BuiltinStorage":"32 GB",
            "BatteryCapacity":"3430 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"nano"
        },
        {
            "CompanyName":"Sony",
            "PhoneName":"Xperia M",
            "OperatingSystem":"Android (5.0)",
            "PhysicalSize":"5.0 inches",
            "Resolution":"1080 x 1920 pixels",
            "PixelDensity":"441 ppi",
            "Camera":"21.5 megapixels",
            "FrontCamera":"13 megapixels",
            "Processor":"Octa-core",
            "Clock Rate":"2000 MHz",
            "SystemMemory":"3072 MB RAM",
            "BuiltinStorage":"16 GB",
            "BatteryCapacity":"2600 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"nano"
        },
        {
            "CompanyName":"Sony",
            "PhoneName":"Xperia C5 Ultra",
            "OperatingSystem":"Android (5.0)",
            "PhysicalSize":"6.0 inches",
            "Resolution":"1080 x 1920 pixels",
            "PixelDensity":"367 ppi",
            "Camera":"13 megapixels",
            "FrontCamera":"13 megapixels",
            "Processor":"Octa-core",
            "Clock Rate":"1700 MHz",
            "SystemMemory":"2048 MB RAM",
            "BuiltinStorage":"16 GB",
            "BatteryCapacity":"2930 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"nano"
        },
        {
            "CompanyName":"Sony",
            "PhoneName":"Xperia Z4 V",
            "OperatingSystem":"Android (5.1)",
            "PhysicalSize":"5.2 inches",
            "Resolution":"1440 x 2560 pixels",
            "PixelDensity":"565 ppi",
            "Camera":"20.7 megapixels",
            "FrontCamera":"5 megapixels",
            "Processor":"Octa-core",
            "Clock Rate":"2000 MHz",
            "SystemMemory":"3072 MB RAM",
            "BuiltinStorage":"32 GB",
            "BatteryCapacity":"3000 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"nano"
        },
        {
            "CompanyName":"Sony",
            "PhoneName":"Xperia Z3+",
            "OperatingSystem":"Android (5.0)",
            "PhysicalSize":"5.2 inches",
            "Resolution":"1080 x 1920 pixels",
            "PixelDensity":"424 ppi",
            "Camera":"20.7 megapixels",
            "FrontCamera":"5 megapixels",
            "Processor":"Octa-core",
            "Clock Rate":"2000 MHz",
            "SystemMemory":"3072 MB RAM",
            "BuiltinStorage":"32 GB",
            "BatteryCapacity":"2930 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"nano"
        },
        {
            "CompanyName":"Sony",
            "PhoneName":"Xperia C4",
            "OperatingSystem":"Android (5.0)",
            "PhysicalSize":"5.5 inches",
            "Resolution":"1080 x 1920 pixels",
            "PixelDensity":"401 ppi",
            "Camera":"13 megapixels",
            "FrontCamera":"5 megapixels",
            "Processor":"Octa-core",
            "Clock Rate":"1700 MHz",
            "SystemMemory":"16 GB RAM",
            "BuiltinStorage":"16 GB",
            "BatteryCapacity":"2600 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"nano"
        },
        {
            "CompanyName":"Sony",
            "PhoneName":"Xperia M4 Aqua",
            "OperatingSystem":"Android (5.0)",
            "PhysicalSize":"5.0 inches",
            "Resolution":"720 x 1280 pixels",
            "PixelDensity":"294 ppi",
            "Camera":"13 megapixels",
            "FrontCamera":"5 megapixels",
            "Processor":"Octa-core",
            "Clock Rate":"1500 MHz",
            "SystemMemory":"16 GB RAM",
            "BuiltinStorage":"16 GB",
            "BatteryCapacity":"2400 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"nano"
        },
        {
            "CompanyName":"Sony",
            "PhoneName":"Xperia E4",
            "OperatingSystem":"Android (4.4.4)",
            "PhysicalSize":"5.0 inches",
            "Resolution":"540 x 960 pixels",
            "PixelDensity":"220 ppi",
            "Camera":"5 megapixels",
            "FrontCamera":"2 megapixels",
            "Processor":"Quad-core",
            "ClockRate":"1300 MHz",
            "SystemMemory":"8 GB RAM",
            "BuiltinStorage":"8 GB",
            "BatteryCapacity":"2300 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"micro"
        },
        {
            "CompanyName":"Microsoft",
            "PhoneName":"Lumia 950",
            "OperatingSystem":"Windows (10 Mobile)",
            "PhysicalSize":"5.2 inches",
            "Resolution":"1440 x 2560 pixels",
            "PixelDensity":"565 ppi",
            "Camera":"20 megapixels",
            "FrontCamera":"5 megapixels",
            "Processor":"Hexa-core",
            "Clock Rate":"1800 MHz",
            "SystemMemory":"3072 MB RAM",
            "BuiltinStorage":"32 GB",
            "BatteryCapacity":"3000 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"nano"
        },
        {
            "CompanyName":"LG",
            "PhoneName":"Nexus 5X",
            "OperatingSystem":"Android (6.0)",
            "PhysicalSize":"5.2 inches",
            "Resolution":"1080 x 1920 pixels",
            "PixelDensity":"423 ppi",
            "Camera":"12.3 megapixels",
            "FrontCamera":"5 megapixels",
            "Processor":"Hexa-core",
            "ClockRate":"1800 MHz",
            "SystemMemory":"2048 MB RAM",
            "BuiltinStorage":"32 GB",
            "BatteryCapacity":"2700 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"nano"
        },
        {
            "CompanyName":"Sony",
            "PhoneName":"Xperia Z5",
            "OperatingSystem":"Android (5.1)",
            "PhysicalSize":"5.2 inches",
            "Resolution":"1080 x 1920 pixels",
            "PixelDensity":"424 ppi",
            "Camera":"23 megapixels",
            "FrontCamera":"5 megapixels",
            "Processor":"Octa-core",
            "ClockRate":"2000 MHz",
            "SystemMemory":"3072 MB RAM",
            "BuiltinStorage":"32 GB",
            "BatteryCapacity":"2900 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"nano"
        },
        {
            "CompanyName":"LG",
            "PhoneName":"G4",
            "OperatingSystem":"Android (5.1)",
            "PhysicalSize":"5.5 inches",
            "Resolution":"1440 x 2560 pixels",
            "PixelDensity":"538 ppi",
            "Camera":"16 megapixels",
            "FrontCamera":"8 megapixels",
            "Processor":"Hexa-core",
            "ClockRate":"1800 MHz",
            "SystemMemory":"3072 MB RAM",
            "BuiltinStorage":"32 GB",
            "BatteryCapacity":"3000 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"micro"
        },
        {
            "CompanyName":"Xiamo",
            "PhoneName":"MI 4I",
            "OperatingSystem":"Android (5.0)",
            "PhysicalSize":"5.0 inches",
            "Resolution":"1080 x 1920 pixels",
            "PixelDensity":"441 ppi",
            "Camera":"13 megapixels",
            "FrontCamera":"5 megapixels",
            "Processor":"Octa-core",
            "ClockRate":"1700 MHz",
            "SystemMemory":"2048 MB RAM",
            "BuiltinStorage":"32 GB",
            "BatteryCapacity":"3120 mAh",
            "MultipleSIMCards":1,
            "SIM ard":"micro"
        },
        {
            "CompanyName":"Huawei",
            "PhoneName":"Nexus 6P",
            "OperatingSystem":"Android (6.0)",
            "PhysicalSize":"5.7 inches",
            "Resolution":"1440 x 2560 pixels",
            "PixelDensity":"518 ppi",
            "Camera":"12.3 megapixels",
            "FrontCamera":"8 megapixels",
            "Processor":"Octa-core",
            "ClockRate":"2000 MHz",
            "SystemMemory":"3072 MB RAM",
            "BuiltinStorage":"128 GB",
            "BatteryCapacity":"3450 mAh",
            "MultipleSIMCards":0,
            "SIMCard":"nano"
        }
    ]