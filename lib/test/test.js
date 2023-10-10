"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTagResponse = void 0;
const mocha_1 = require("mocha");
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const server_1 = __importDefault(require("../src/server"));
const should_1 = __importDefault(require("should"));
const validateTagResponse = (tag) => {
    should_1.default.exist(tag);
    should_1.default.not.exist(tag.__v);
    tag.name.should.be.String();
    tag.label.should.be.String();
    tag.parent.should.be.String();
    tag.ref.should.be.String();
    return true;
};
exports.validateTagResponse = validateTagResponse;
chai_1.default.use(chai_http_1.default);
let tag = {
    name: "new_tag",
    label: "New Tag",
    parent: "venue",
    ref: "123123",
};
(0, mocha_1.describe)('[sn-api] Tags Service', () => {
    (0, mocha_1.it)('Creates a new tag', (done) => {
        chai_1.default.request(server_1.default)
            .post('/api/tags')
            .set('Content-Type', 'application/json')
            .send({ data: tag })
            .end((err, res) => {
            should_1.default.equal(res.status, 200);
            should_1.default.exist(res.body);
            (0, exports.validateTagResponse)(res.body.data);
            done();
        });
    });
    (0, mocha_1.it)('Retrieves many tags', (done) => {
        chai_1.default.request(server_1.default)
            .get('/api/tags')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
            should_1.default.equal(res.status, 200);
            should_1.default.exist(res.body);
            should_1.default.exist(res.body.data);
            res.body.data.should.be.Array();
            res.body.data.should.not.have.length(0);
            (0, exports.validateTagResponse)(res.body.data[0]);
            done();
        });
    });
    (0, mocha_1.it)('Retrieves one tag', (done) => {
        chai_1.default.request(server_1.default)
            .get(`/api/tags/${tag.name}`)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
            should_1.default.equal(res.status, 200);
            should_1.default.exist(res.body);
            (0, exports.validateTagResponse)(res.body.data);
            done();
        });
    });
    (0, mocha_1.it)('Updates a tag label', (done) => {
        tag.label = "New Label";
        chai_1.default.request(server_1.default)
            .put(`/api/tags/${tag.name}`)
            .set('Content-Type', 'application/json')
            .query({ label: tag.label })
            .end((err, res) => {
            should_1.default.equal(res.status, 200);
            should_1.default.exist(res.body);
            should_1.default.equal(res.body.data, true);
            done();
        });
    });
    (0, mocha_1.it)('Updates a tag parent', (done) => {
        tag.parent = "dining";
        chai_1.default.request(server_1.default)
            .put(`/api/tags/${tag.name}`)
            .set('Content-Type', 'application/json')
            .query({ parent: tag.parent })
            .end((err, res) => {
            should_1.default.equal(res.status, 200);
            should_1.default.exist(res.body);
            should_1.default.equal(res.body.data, true);
            done();
        });
    });
    (0, mocha_1.it)('Updates a tag ref', (done) => {
        tag.ref = "111111";
        chai_1.default.request(server_1.default)
            .put(`/api/tags/${tag.name}`)
            .set('Content-Type', 'application/json')
            .query({
            ref: "111111"
        })
            .end((err, res) => {
            should_1.default.equal(res.status, 200);
            should_1.default.exist(res.body);
            should_1.default.equal(res.body.data, true);
            done();
        });
    });
    (0, mocha_1.it)('Verifies updated tag data', (done) => {
        chai_1.default.request(server_1.default)
            .get(`/api/tags/${tag.name}`)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
            should_1.default.equal(res.status, 200);
            should_1.default.exist(res.body);
            (0, exports.validateTagResponse)(res.body.data);
            should_1.default.equal(res.body.data.name, tag.name);
            should_1.default.equal(res.body.data.label, tag.label);
            should_1.default.equal(res.body.data.parent, tag.parent);
            should_1.default.equal(res.body.data.ref, tag.ref);
            done();
        });
    });
    (0, mocha_1.it)('Deletes a tag', (done) => {
        chai_1.default.request(server_1.default)
            .delete(`/api/tags/${tag.name}`)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
            should_1.default.equal(res.status, 200);
            should_1.default.exist(res.body);
            should_1.default.equal(res.body.data.deleted, true);
            done();
        });
    });
});
