# java

## 核心概念
JVM(java virtual machine)  
.java文件为源文件(鱼) -》 经过编译器javac生成(刀) -》 .class的字节码文件(杀过的鱼) -》 解释器(炊具) -》 my program  
JDK(java development kit)(JAVA开发工具包)  
JRE(java runtime environment)(JAVA运行环境)  

## 编写java程序
Hello.java
```
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
```
编译生成.class字节码文件：javac Hello.java
运行java程序：java Hello

## eclipse开发java程序
eclipse(IDE集成开发环境) 
- 创建java项目，新建java project
- 创建程序包，src下新建package包(名称域名反向)
- 编写java源程序
- 运行java程序

## 类
描述对象的属性特征和方法，通过类获得对象的信息；
对象是类的实体  

## java对象
1.创建对象：  
类名 对象名 = new 类名();
Telphone phone = new Telphone();
2,使用对象
引用对象的属性：对象名.属性
phone.screem = 5;
引用对象的方法：对象名.方法名()
phone.call();

## java成员变量和局部变量
*作用域*  
局部变量的作用域仅限于定义她的方法（方法内变量）  
成员变量的作用域在整个类内部可见（类中变量）  
*初始值*  
java会给成员变量初始值，不给局部变量初始值  
*注意*
同一方法中，不允许同名局部变量，不同方法中可有局部变量；
两类变量同名，局部变量有更高优先级  
