<%--
  Created by IntelliJ IDEA.
  User: USER
  Date: 2024-08-13
  Time: 오후 7:19
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>InputResult</title>
</head>
<body>
    <h1>NUM1 ${param.num1}</h1>
    <h1>NUM2 ${param.num2}</h1>

    <h1>SUM <%= Integer.parseInt(request.getParameter("num1"))
            + Integer.parseInt(request.getParameter("num2")) %></h1>

</body>
</html>
