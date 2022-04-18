# vue3-ts-cms

## 1.项目规范

### 1.1. eslint

项目使用 eslint 和 pretter 来规范代码，安装方式使用脚手架方式默认安装。

### 1.2. pretter

配置.prettierrc 文件：

```json
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
```

.prettierignore 忽略文件

```
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

### 1.3. 集成 editorconfig 配置

EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格。

```yaml
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

### 1.4. git Husky 和 eslint

使用 Husky 来规范提交的代码，husky 会通过拦截 git commite 的方式来拦截代码并进行操作，符合规范才可提交

### 1.5. git 提交规范

提交代码需要使用 `npx cz`

- 第一步是选择 type，本次更新的类型

| Type     | 作用                                                                                   |
| -------- | -------------------------------------------------------------------------------------- |
| feat     | 新增特性 (feature)                                                                     |
| fix      | 修复 Bug(bug fix)                                                                      |
| docs     | 修改文档 (documentation)                                                               |
| style    | 代码格式修改(white-space, formatting, missing semi colons, etc)                        |
| refactor | 代码重构(refactor)                                                                     |
| perf     | 改善性能(A code change that improves performance)                                      |
| test     | 测试(when adding missing tests)                                                        |
| build    | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等）                           |
| ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
| chore    | 变更构建流程或辅助工具(比如更改测试环境)                                               |
| revert   | 代码回退                                                                               |

- 第二步选择本次修改的范围（作用域）

![image-20210723150147510](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/008i3skNgy1gsqw8ca15oj30r600wmx4.jpg)

- 第三步选择提交的信息

![image-20210723150204780](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/008i3skNgy1gsqw8mq3zlj60ni01hmx402.jpg)

- 第四步提交详细的描述信息

![image-20210723150223287](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/008i3skNgy1gsqw8y05bjj30kt01fjrb.jpg)

- 第五步是否是一次重大的更改

![image-20210723150322122](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/008i3skNgy1gsqw9z5vbij30bm00q744.jpg)

- 第六步是否影响某个 open issue

![image-20210723150407822](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/008i3skNgy1gsqwar8xp1j30fq00ya9x.jpg)

我们也可以在 scripts 中构建一个命令来执行 cz：

![image-20210723150526211](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/008i3skNgy1gsqwc4gtkxj30e207174t.jpg)

## 2.axios 封装

### 2.1.axios 封装文件夹目录结构

![image-20220124112620429](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124112620429.png)

### 2.2.封装 axios 主要部分

#### 2.2.1.安装 axios

axios 需要在项目中使用，所以直接`npm install axios`

#### 2.2.2.创建 axios 实例

**此处使用 class 来进行对象的封装。**

1. 从文件中导入 axios。

   ![image-20220124114450824](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124114450824.png)

2. 在 class 的构造器内使用 axios.create 来创建 axios 实例，可以看到 axios.create 需要传入一个 AxiosRequestConfig 类型的参数，并且函数会返回一个 AxiosInstance 类型的实例。![image-20220124114309096](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124114309096.png)

3. 将返回的类型进行保存，后面进行拓展。![image-20220124115021818](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124115021818.png)

#### 2.2.3.实现 axios 请求功能

1. 这里使用实例中的`request`方法，`request`方法接受一个`AxiosRequestConfig`类型的参数。

   ![image-20220124120936241](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124120936241.png)

   ![image-20220124122017821](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124122017821.png)

2. 可以看到`request`方法的返回值是`Promise<R>`,而`<R>`是由`<T>`来决定具体的`AxiosResponse`类型。这样就确定了我们封装函数`Promise`中的返回值类型是`AxiosResponse<T>`。由于返回的数据存在于结果部分，而我们可以直接返回结果，这就可以将函数的返回值从`AxiosResponse<T>`类型缩窄为`<T>`![image-20220124151543579](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124151543579.png)

   ![image-20220124151101839](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124151101839.png)

#### 2.2.4.axios 实例拦截器的封装

这里的拦截器封装分为三个部分：**全局、实例、具体请求**。由于实例化的拦截器需要在`class`内的`constructor`中去进行配置，所以我们需要将`AxiosRequestConfig`类型来进行拓展。

##### 2.2.4.1.设置类型

1. 命名一个`IAxiosRequestConfig`接口继承自`AxiosRequestConfig`，并创建一个`interceptions`属性存放拦截器的四个状态(请求成功失败、返回成功失败)下的回调函数，类型暂定为`any`。![image-20220124162145164](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124162145164.png)

2. 由于我们传入的 interceptions 属性包含拦截器在四个状态下回调函数，所以我们的 interceptions 属性类型需要包含四个函数`requestInterceptor`、`requestInterceptorCatch`、`responseInterceptor`、`responseInterceptorCatch`，这里我们也将这四个函数暂定为 any。完成到这里，我们的类型应该是这样的，就差将拦截器的类型缩窄就完成类型的拓展的。![image-20220124163501989](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124163501989.png)

3. 在查看 Axios 的声明文件中我们可以看到`interceptors`中含有`request`、`response`两个属性，两个属性是`AxiosInterceptorManageer`类型的。**他们对成功的参数都是由泛型 V 来决定的**，请求和返回分别是`AxiosRequestConfig`和`AxiosResponse`。而失败回调的参数和返回值都是`any`。![image-20220124164631764](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124164631764.png)

4. 这时我们在去把类型进行缩窄，将 interceptors 的接口类型规范起来。![image-20220124165852289](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124165852289.png)

##### 2.2.4.2. 注册拦截器

由于我们的拦截器是三个全局、实例、请求三个部分。**这里有一个点需要注意的就是在我们使用拦截器时，在发送拦截时越早注册的拦截器越晚触发，而返回时则是调转的。**

1. 全局部分的拦截器只需要调用即可![image-20220124173516136](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124173516136.png)

2. 实例部分的拦截器则需要判断一下是否传入再进行注册。![image-20220124173556287](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124173556287.png)

3. 在设置请求拦截器时我们可以在现有基础上小改动一下类型让返回的类型更明确。由于我们现在使用的`IAxiosRequestConfig`是继承自`AxiosRequestConfig`的，我们可以在**接口中接受一个泛型 T**，通过层层传递，传递给`IAxiosRequestConfig`接口的`interceptors`属性内的`responseInterceptor`，这样我们在使用拦截器也能有类型提示了。

   ![image-20220124175027071](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124175027071.png)

   ![image-20220124175718490](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124175718490.png)
