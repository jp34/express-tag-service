import { describe, it } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/server";
import should from "should";

export const validateTagResponse = (tag: any) => {
    should.exist(tag);
    should.not.exist(tag.__v);
    tag.name.should.be.String();
    tag.label.should.be.String();
    tag.parent.should.be.String();
    tag.ref.should.be.String();
    return true;
}

chai.use(chaiHttp);

let tag = {
    name: "new_tag",
    label: "New Tag",
    parent: "venue",
    ref: "123123",
};

describe('[sn-api] Tags Service', () => {

    it('Creates a new tag', (done) => {
        chai.request(server)
            .post('/api/tags')
            .set('Content-Type', 'application/json')
            .send({ data: tag })
            .end((err, res) => {
                should.equal(res.status, 200);
                should.exist(res.body);
                validateTagResponse(res.body.data);
                done();
            });
    });

    it ('Retrieves many tags', (done) => {
        chai.request(server)
            .get('/api/tags')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                should.equal(res.status, 200);
                should.exist(res.body);
                should.exist(res.body.data);
                res.body.data.should.be.Array();
                res.body.data.should.not.have.length(0);
                validateTagResponse(res.body.data[0]);
                done();
            });
    });

    it('Retrieves one tag', (done) => {
        chai.request(server)
            .get(`/api/tags/${tag.name}`)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                should.equal(res.status, 200);
                should.exist(res.body);
                validateTagResponse(res.body.data);
                done();
            });
    });

    it('Updates a tag label', (done) => {
        tag.label = "New Label";
        chai.request(server)
            .put(`/api/tags/${tag.name}`)
            .set('Content-Type', 'application/json')
            .query({ label: tag.label })
            .end((err, res) => {
                should.equal(res.status, 200);
                should.exist(res.body);
                should.equal(res.body.data, true);
                done();
            });
    });

    it('Updates a tag parent', (done) => {
        tag.parent = "dining";
        chai.request(server)
            .put(`/api/tags/${tag.name}`)
            .set('Content-Type', 'application/json')
            .query({ parent: tag.parent })
            .end((err, res) => {
                should.equal(res.status, 200);
                should.exist(res.body);
                should.equal(res.body.data, true);
                done();
            });
    });

    it('Updates a tag ref', (done) => {
        tag.ref = "111111";
        chai.request(server)
            .put(`/api/tags/${tag.name}`)
            .set('Content-Type', 'application/json')
            .query({
                ref: "111111"
            })
            .end((err, res) => {
                should.equal(res.status, 200);
                should.exist(res.body);
                should.equal(res.body.data, true);
                done();
            });
    });

    it('Verifies updated tag data', (done) => {
        chai.request(server)
            .get(`/api/tags/${tag.name}`)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                should.equal(res.status, 200);
                should.exist(res.body);
                validateTagResponse(res.body.data);
                should.equal(res.body.data.name, tag.name);
                should.equal(res.body.data.label, tag.label);
                should.equal(res.body.data.parent, tag.parent);
                should.equal(res.body.data.ref, tag.ref);
                done();
            });
    });

    it ('Deletes a tag', (done) => {
        chai.request(server)
            .delete(`/api/tags/${tag.name}`)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                should.equal(res.status, 200);
                should.exist(res.body);
                should.equal(res.body.data.deleted, true);
                done();
            });
    });
});
