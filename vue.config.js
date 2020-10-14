const bookdetails = require('./bookdetails.json')

const bookcontents = require('./bookcontents.json')


module.exports = {
    configureWebpack: {
        devServer: {
            before(app) {
                app.get('/book/details', function(req, res) {
                    res.json({
                        code: 1,
                        data: bookdetails
                    });
                });
                app.get('/book/contents', function(req, res) {
                    res.json({
                        code: 1,
                        data: bookcontents
                    });
                });
            },
            proxy:{
                '/ranking':{
                    // http://api.zhuishushenqi.com/ranking/54d43437d47d13ff21cad58b
                    target:"http://api.zhuishushenqi.com",
                    changeOrigin:true,
                }
            }
        }
    }
}