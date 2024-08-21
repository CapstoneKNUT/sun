<%--
  Created by IntelliJ IDEA.
  User: USER
  Date: 2024-08-14
  Time: 오후 4:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> <%--JSTL--%>

<html>
<head>
    <title>Title</title>
</head>
<body>
<h1>List Page</h1>

<%--반복문--%>
<ul>
    <c:forEach var ="dto" items="${list}">
        <li>${dto}</li>
    </c:forEach>
</ul>
<%--조건문--%>
<c:if test="${list.size() % 2 ==0}">
    if로 짝수 알아냄
</c:if>
<c:if test="${list.size() % 2 !=0}">
    홀수
</c:if>

<c:choose>
    <c:when test="${list.size() % 2 ==0}">
        choose로 짝수 알아냄
    </c:when>
    <c:otherwise>
        홀수
    </c:otherwise>
</c:choose>
<%--선언문 추가--%>
<c:set var="target" value="5"></c:set>

<ul>
    <c:forEach var ="num" begin="1" end="10">
        <c:choose>
            <c:when test="${num == target}">
                <h4>num is target</h4>
            </c:when>
            <c:otherwise>
                <h4>num is not target</h4>
            </c:otherwise>
        </c:choose>
    </c:forEach>
</ul>

${list[1].tno} --- ${list[1].title}

</body>
</html>
