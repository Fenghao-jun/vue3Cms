# vue3-ts-cms

## 1.项目搭建

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

# VUE3项目开发

## 1.defindComponent的作用

vue3+TS的项目中会发现组件不再默认导出一个对象，而是导出了一个由`defindComponent`函数去包裹的对象。但是在`defind Component`的内部函数实现中，他仅仅只是将传入的对象进行了返回。但是在TS的实现中，这个函数允许传入很多泛型。

![image-20220209110738339](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220209110738339.png)

vue3利用ts的类型推导达到在setup中会根据Props推导出来的值，来达到代码的提示

![image-20220209110948772](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220209110948772.png)



## 2.vue文件类型声明

VUE3的TS项目会多出来一个`shime-vue.d.ts`的声明文件。这个文件声明了vue文件的类型，vue文件导出一个compoent变量，这个component变量的类型则是上面的DefineComponent类型![image-20220209111503027](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220209111503027.png)

## 3.初始化

我们将vue脚手架创建出来的东西全部删除之后，会发现有一些浏览器内部默认的样式是无法删除的。这时可以使用到一个`normalize。css`文件。可以从github上进行下载，也可以使用`npm install normalize.css`。

## 4.设置ref、调用ref的方法

在vue3中将组件设置为ref后，如果我们需要调用他的方法会发现TS是会认为这种方式是存在隐患的，因为我们没有给ref设置类型，虽然我们确定这方法是存在，但是却无法调用，我们可以通过给ref传入`InstanceType<typeof 组件名>`泛型的形式来规范这个ref的类型，从而进行调用。但是在调用中，因为ref在未渲染之前可能会存在这个方法的丢失，所以在调用时需要试用到可选链

### 4.1vue导出的到底是什么？

在我们创建`demo.vue`文件时，`vue`文件会默认导出一个对象，而这个对象就是对当前demo**组件的描述**。当我们需要使用到demo组件时，才会去创建demo组件的**实例**。

### 4.2.vue文件是可以new出来的

我们知道使用`vue3`中使用`ts`是需要额外包裹一层`defineComponent`的，而`defineComponent`返回一个联合类型(`DefineComponent`)，在这个联合类型中我们可以看到有一个`ComponentPublicInstanceConstructor`类型，而这个类型中则**包含了一个构造器**。

![image-20220211171656471](/Users/fatjun/Library/Application%2520Support/typora-user-images/image-20220211171656471.png)

### 4.3 推断组件的类型

当我们创建ref时，我们是需要给他传入类型的。TS中的`InstanceType`会**返回构造实例的类型**。通过这样的方式来推断出ref的类型

![image-20220211164510496](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220211164510496.png)



## 5.template中使用别名

在template中，如果也想使用别名，需要在别名前面加上～



## 6.没有类型的store

在项目中如果使用useStore方法，返回的Store类型是没有限制的any类型。

![image-20220220232918958](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220220232918958.png)

在ts的使用中，这样的情况就可能存在错误的发生。因此我们可以额外封装一个方法，让其附带类型。

封装useStore函数，该函数返回一个Store类型，但又因为useStore是vuex的函数，所以我们引入时需要别名引入。

![image-20220220233620792](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220220233620792.png)

重写部分：

![image-20220220233635821](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220220233635821.png)

类型部分：

![image-20220220233655441](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220220233655441.png)

store重新含有类型：

![image-20220220233801810](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220220233801810.png)

## 7.动态路由的几种方案。

### 基于角色

#### 1.菜单获取

当前菜单获取方案使用基于角色的模式，在登陆完成后获取当前用户的角色。由唯一索引进行判断是否为二级菜单/三级菜单，再对返回数据进行拼装。从而动态生成菜单。

### 2.动态路由

##### 2.1.方案一：设置不同的角色权限

可以通过前端设置不同的角色权限进行路由的映射，在进行登陆完成并获取到当前用户的角色之后，将预先设置好的当前用户的路由映射进行添加。

```js
//举个例子：
//目前有用户admin和reader
//
const a = {
  admin :[路由对象1，路由对象2],
  reader:[路由对象1]
}

//登陆reader时：
const routes = a[user.type]
routes.forEach((item)=>{
  router.addRoute('main',item)
})
```

但是这样的设计模式在当遇到需要角色的权限时，就会出现只能在代码中去进行修改的情况发生，并不能动态的去修改代码。

## 8.响应式的处理

由于表格的响应式采用el-col，el-col提供不同的屏幕尺寸下对栏的大小进行不同的自适应

![image-20220320173349322](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220320173349322.png)

所以只需在组件中配置好不同的尺寸下的大小即可

![image-20220320173427527](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220320173427527.png)

## 9.菜单的一些细节处理

### 9.1匹配对应菜单选项位置

在刷新页面时，由于没有给菜单设置defaultValue，组件是无法自动匹配到对应的菜单位置的。我们可以通过使用递归来封装函数，找到与当前路由路径相匹配的route，将其返回，由于本项目使用的是id为菜单选项的唯一标识，所以这里使用返回route的id。

![image-20220320185504156](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220320185504156.png)

### 9.2main的重定向

由于使用的动态路由，所以我们是无法在router配置文件中再对main进行重定向（因为不知道是否有该页面的权限），所以这里采用在处理后台返回的菜单数据时，拿到首个菜单数据，再在路由钩子函数处进行处理。

![image-20220320204930436](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220320204930436.png)

## 10.v-model的一些问题

在封装from组件时，由于需要使用双向绑定，在内部实现时一开始使用计算属性发现设置的set并不会在值被修改时被触发，但是这样的话，四舍五入也是修改了原本的属性，而不是通过事件传递去修改。所以此处使用watch监听变化，再触发事件修改

![image-20220325095844842](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220325095844842.png)

## 11.封装表格组件

封装表格组件最大的突破点则是使用动态具名插槽，插槽名字由传入的列配置决定，默认情况下显示列的prop数据，但需要修改时可以使用插槽来进行修改。

封装：

![image-20220325100553067](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220325100553067.png)

使用：

![image-20220325100609911](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220325100609911.png)



## 12.表格的第二层封装

本项目采用三层结构：`base-ui组件处理层`、`component业务组件封装层`、`页面应用层`

由于项目使用的是在vuex中处理请求的方式，我们可以通过在组件中匹配不同的url、规则来获取数据。



## 13.重置表格属性遇到的一些问题

### 13.1.问题发生原因

由于现在采用的是双层结构上的组件封装，base组件采用v-model的方式来进行数据的绑定。**首先我们要了解v-model**，v-model是vue提供的语法糖，实际上他是**动态绑定:modelValue**和**事件传递@update:model**的**结合体**。

在base组件中，我们将props传递进来的modelValue进行了解构处理，在这个时候，留在base组件中的formData已经跟刚传递进来的对象脱离了关系。所以当我们直接去修改这个值的时候，其实并没有触发传递出来的事件。

### 13.2.解决方案

#### 1.for循环修改对象里面的值

通过for循环去修改对象里面的值的时候，子组件是可以监听到的![image-20220331115649214](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220331115649214.png)

#### 2.把重置方法写进base组件中

![image-20220331115841355](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220331115841355.png)

#### 3.自行实现v-model



![image-20220331154638713](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220331154638713.png)

我们把值当成普通的动态绑定传入，并且自己来掌管update:modelValue这个事件，在事件处理函数中，每个调用都会将传入到base组件中的modelValue属性进行解构再赋值

![image-20220331154817647](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220331154817647.png)

## 14.业务表格上的封装

在表格的第二层封装中，我们封装了一些默认的插槽样式，例如handler、updateAt、createAt这些等，但是当我们业务上遇到改动时，我们是无法将表格的样式在第二层封装中进行无限拓展的。所以这时我们需要对传递到**第二层封装上的数据进行一些拓展**。

首先我们需要得到将**基础的插槽进行过滤后剩下的插槽信息**。

![image-20220406104638413](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220406104638413.png)

由于我们在最底层的base组件中是将传入的配置插槽进行全数遍历的，所以我们现在只需要在第二层中进行处理，并使用动态具名插槽将其暴露。

![image-20220406105502417](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220406105502417.png)

## 15.权限管理

该项目在菜单获取接口中就会将页面的权限进行传递，所以我们只需在菜单获取到时，将权限获取到，并且使用hooks检测是否含有当前权限，再对业务进行相关处理即可。

### 一。获取

![image-20220406105925135](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220406105925135.png)

### 二。保存在vuex中

![image-20220406105951202](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220406105951202.png)

### 三。抽离hooks

也可以使用指令的形式

![image-20220406110011869](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220406110011869.png)

### 四。使用

![image-20220406110131549](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220406110131549.png)

## 16.隐藏特定组件

在之前封装的表单组件中，我们为密码类型单独设置了样式。但在很多的页面中，我们创建用户是需要用户设置自身的账号的密码的，但是当我们需要编辑时，我们会发现除了密码框，其他都应该正常显示，那么要怎么才能做到这个效果呢？

由于我们使用的是dialog来控制组件的显示，所以在我们处理函数中，我们需要传入回调，让回调去处理

Hook:

![image-20220409105240012](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220409105240012.png)

处理函数修改是否隐藏

![image-20220409105345400](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220409105345400.png)

## 17.处理由服务器返回数据决定的选项

由于我们对表单组件进行过封装，但是在实际项目中，我们的select下拉选择器内部的数据并非是写死的，而是从服务器进行获取的。

由于我们使用的是外部引入的配置文件，那么我们可以将其进行修改，然后将其返回。

## 18.处理选项数据的bug

在上面我们处理选项的数据中，我们发现，**数据并非是响应式的，即是当我们打开当前的页面时，如果向服务器发送的请求并没有及时返回，那么选项中将没有数据（因为setup只会执行一次）**，这时我们可以利用computed计算属性中的**副作用（即是依赖更新会引发计算属性的更新）**,这时我们就不能使用从外部引入的配置了，需要使用computed属性

![image-20220409114000770](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220409114000770.png)



## 19.git

### 19.1.合并分支到远程分支

假设： dev是主分支

​      dev_local 是本地分支

 

**1、创建本地分支：**

git checkout -b dev_local

或在之前的本地分支上拉取最新数据

git pull origin dev



**建立本地到远端仓库的链接 --这样代码才能提交上去**

**使用命令行**

```csharp
git push --set-upstream origin dev  //dev为创建分支的名字
  git push origin 分支名
```

 

**2、修改dev_local 中的代码后**

git add .

git commit -m "merge dev_local to dev"

 

**3、切换分支到dev**

git checkout dev

 

**4.\**合并dev_local 到 dev\****

git merge dev_local

 

**5、push 到远程分支**

git push origin dev

 

**6、删除本地dev_local 分支（看开发情况，需要就删，不需要就不删除）**

git branch -d dev_local

## 20.UTC时间的偏移

由于时间是基于UTC时间，所以在使用格式化时**需要调用dayjs的offset方法**进行偏移

## 21.axios 封装

### 21.1.axios 封装文件夹目录结构

![image-20220124112620429](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124112620429.png)

### 21.2.封装 axios 主要部分

#### 21.2.1.安装 axios

axios 需要在项目中使用，所以直接`npm install axios`

#### 21.2.2.创建 axios 实例

**此处使用 class 来进行对象的封装。**

1. 从文件中导入 axios。

   ![image-20220124114450824](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124114450824.png)

2. 在 class 的构造器内使用 axios.create 来创建 axios 实例，可以看到 axios.create 需要传入一个 AxiosRequestConfig 类型的参数，并且函数会返回一个 AxiosInstance 类型的实例。![image-20220124114309096](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124114309096.png)

3. 将返回的类型进行保存，后面进行拓展。![image-20220124115021818](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124115021818.png)

#### 21.2.3.实现 axios 请求功能

1. 这里使用实例中的`request`方法，`request`方法接受一个`AxiosRequestConfig`类型的参数。

   ![image-20220124120936241](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124120936241.png)

   ![image-20220124122017821](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124122017821.png)

2. 可以看到`request`方法的返回值是`Promise<R>`,而`<R>`是由`<T>`来决定具体的`AxiosResponse`类型。这样就确定了我们封装函数`Promise`中的返回值类型是`AxiosResponse<T>`。由于返回的数据存在于结果部分，而我们可以直接返回结果，这就可以将函数的返回值从`AxiosResponse<T>`类型缩窄为`<T>`![image-20220124151543579](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124151543579.png)

   ![image-20220124151101839](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124151101839.png)

#### 21.2.4.axios 实例拦截器的封装

这里的拦截器封装分为三个部分：**全局、实例、具体请求**。由于实例化的拦截器需要在`class`内的`constructor`中去进行配置，所以我们需要将`AxiosRequestConfig`类型来进行拓展。

##### 21.2.4.1.设置类型

1. 命名一个`IAxiosRequestConfig`接口继承自`AxiosRequestConfig`，并创建一个`interceptions`属性存放拦截器的四个状态(请求成功失败、返回成功失败)下的回调函数，类型暂定为`any`。![image-20220124162145164](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124162145164.png)

2. 由于我们传入的 interceptions 属性包含拦截器在四个状态下回调函数，所以我们的 interceptions 属性类型需要包含四个函数`requestInterceptor`、`requestInterceptorCatch`、`responseInterceptor`、`responseInterceptorCatch`，这里我们也将这四个函数暂定为 any。完成到这里，我们的类型应该是这样的，就差将拦截器的类型缩窄就完成类型的拓展的。![image-20220124163501989](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124163501989.png)

3. 在查看 Axios 的声明文件中我们可以看到`interceptors`中含有`request`、`response`两个属性，两个属性是`AxiosInterceptorManageer`类型的。**他们对成功的参数都是由泛型 V 来决定的**，请求和返回分别是`AxiosRequestConfig`和`AxiosResponse`。而失败回调的参数和返回值都是`any`。![image-20220124164631764](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124164631764.png)

4. 这时我们在去把类型进行缩窄，将 interceptors 的接口类型规范起来。![image-20220124165852289](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124165852289.png)

##### 21.2.4.2. 注册拦截器

由于我们的拦截器是三个全局、实例、请求三个部分。**这里有一个点需要注意的就是在我们使用拦截器时，在发送拦截时越早注册的拦截器越晚触发，而返回时则是调转的。**

1. 全局部分的拦截器只需要调用即可![image-20220124173516136](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124173516136.png)

2. 实例部分的拦截器则需要判断一下是否传入再进行注册。![image-20220124173556287](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124173556287.png)

3. 在设置请求拦截器时我们可以在现有基础上小改动一下类型让返回的类型更明确。由于我们现在使用的`IAxiosRequestConfig`是继承自`AxiosRequestConfig`的，我们可以在**接口中接受一个泛型 T**，通过层层传递，传递给`IAxiosRequestConfig`接口的`interceptors`属性内的`responseInterceptor`，这样我们在使用拦截器也能有类型提示了。

   ![image-20220124175027071](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124175027071.png)

   ![image-20220124175718490](https://fatjun-file.oss-accelerate.aliyuncs.com/uPic/image-20220124175718490.png)

# 
