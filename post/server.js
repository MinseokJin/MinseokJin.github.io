const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

let posts = []; // 메모리에 게시글 저장 (데이터베이스 대신 사용)

// JSON 형식의 POST 데이터를 받기 위해 설정
app.use(express.json());

// 정적 파일 제공 (HTML 파일들)
app.use(express.static('public'));

// 게시글 목록 API
app.get('/posts', (req, res) => {
  res.json(posts);
});

// 게시글 상세보기 API
app.get('/post/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// 글쓰기 API (POST 요청)
app.post('/write', (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: posts.length + 1,
    title,
    content,
    createdAt: new Date().toISOString(),
  };
  posts.push(newPost);
  res.json({ success: true });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
