# https 测试

## 如何跑起来

1. gen crts(some syntax diff between win and linux)
    ```shell
    openssl genrsa -out server.key 2048 &&
    openssl req -new -out server.req -key server.key -subj "//C=CN\ST=Shanghai\L=Pudong\O=Namido\CN=localhost" &&
    openssl genrsa -out ca.key 2048 &&
    openssl req -new -x509 -days 3650 -key ca.key -out ca.crt -sha256 -subj "//C=CN\ST=Shanghai\L=Pudong\O=Namido\CN=Namido CA" &&
    openssl x509 -req -in server.req -out server.crt -CAkey ca.key -CA ca.crt -days 3650 -sha256 -CAcreateserial -CAserial serial
    ```

1. 启动服务器
    ```shell
    npm start
    ```

1. 打开浏览器访问=>http**s**://localhost:3000

## 问题

1. 跨域资源访问问题

```log
Mixed Content: The page at 'https://localhost:3000/demo/uploadfile.html' was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint 'http://qq.100bt.com/uploadImage.action'. This request has been blocked; the content must be served over HTTPS.
```