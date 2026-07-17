"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const path = require("path");
const options = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [path.join(__dirname, '/schemas/**/*{.ts,.js}')],
    migrations: [path.join(__dirname, '/migrations/**/*{.ts,.js}')],
};
exports.default = new typeorm_1.DataSource(options);
//# sourceMappingURL=typeormconfig.js.map