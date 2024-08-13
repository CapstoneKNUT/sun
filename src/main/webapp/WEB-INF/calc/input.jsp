<%--
  Created by IntelliJ IDEA.
  User: USER
  Date: 2024-08-06
  Time: 오전 9:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Input</title>
</head>
<body>
<form action="/calc/makeResult" method="post"> <%--action, method 추가--%>
    <input type="number" name="num1">
    <input type="number" name="num2">
    <button type="submit">SEND</button>
</form>

</body>
</html>
