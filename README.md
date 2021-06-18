### 原理

由于不同用户操作逻辑和权限不一样，所以民工微信目前由两部分组成，分别是系统用户版本和民工版本

系统用户代码在施工3.0的workers分支



### 开发指南

由于目前由两个模块组成，所以需要开发机配置一个nginx，模拟线上的环境，配置应类似下面

```nginx
location / {
            proxy_pass http://127.0.0.1:8080;
        }

location /workers {
            proxy_pass http://127.0.0.1:8081;
        }
```

另外还需要一个带有https的内网穿透环境



### 部署指南

线上nginx配置应如下图所示,并在对应目录部署文件

```nginx
location / {
			root "html/cim6d-cloud/cim6d-front-test/cim6d-wechat/system-user";
			index index.html index.htm;
			try_files $uri $uri/ /index.html;
		}
location /workers {
			root html/cim6d-cloud/cim6d-front-test/cim6d-wechat/workers;
			index index.html index.htm;
			try_files $uri $uri/ /index.html;
		}
```

文件目录类似下图

cim6d-wechat
├─ system-user
├─ workers

