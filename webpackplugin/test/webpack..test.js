var should = require('should');

const webpack = require("webpack");
let path=require("path");

describe("test webpack config", function () {
    it('should not have node_env Set if not provide manually', (done) => {
        webpack({
            entry:"temp.js",
            output:{
                path:path.resolve("./")
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env': {
                        'NODE_ENV': JSON.stringify('production')
                    }
                }),
            ]

        }, (err, stats) => {

            if (err || stats.hasErrors()) {
                // Handle errors here
                done(err)
            }else{
                done(should.not.exist(process.env.NODE_ENV));
            }
            // Done processing
        });
    })

});