<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
  <title>JSP - Hello World</title>
</head>
<body>
<h1><%= "Hello World!" %></h1>
<br/>
<a href="hello-servlet">Hello Servlet</a>

<div class="container">
  <div class="navbar">
    <button class="nav-button"><a href="hello-servlet">🏠 Home</a></button>
    <button class="nav-button"><a href="hello-servlet">여행지 정보</a></button>
    <button class="nav-button"><a href="hello-servlet">리뷰 목록</a></button>
    <button class="nav-button"><a href="hello-servlet">마이 페이지</a></button>
  </div>

  <!-- 게시글 목록 1 -->
  <article class="post" style="left: 304px; top: 188px;">
    <div class="content">
      <header class="post-header">
        <address class="author-info">
          <div class="monogram">A</div>
          <div class="text">
            <div class="author-name">작성자 1호</div>
            <div class="post-date">2024.07.26</div>
          </div>
        </address>
        <button class="icon-button">
          <div class="icon"></div>
        </button>
      </header>
      <section class="post-media">
        <img class="media" src="https://via.placeholder.com/554x166" alt="Media">
      </section>
      <section class="post-content">
        <h2 class="post-title">(게시글 제목)</h2>
      </section>
    </div>
    <div class="background"></div>
  </article>

  <!-- 게시글 목록 2 -->
  <article class="post" style="left: 304px; top: 496px;">
    <div class="content">
      <header class="post-header">
        <address class="author-info">
          <div class="monogram">A</div>
          <div class="text">
            <div class="author-name">작성자 2호</div>
            <div class="post-date">2024.09.02</div>
          </div>
        </address>
        <button class="icon-button">
          <div class="icon"></div>
        </button>
      </header>
      <section class="post-media">
        <img class="media" src="https://via.placeholder.com/554x166" alt="Media">
      </section>
      <section class="post-content">
        <h2 class="post-title">(게시글 제목)</h2>
      </section>
    </div>
    <div class="background"></div>
  </article>
</div>
</body>
</html>