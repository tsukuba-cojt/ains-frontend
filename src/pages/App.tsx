// App.tsx

import React from "react";

import DisplayPage from "./displaypage"; // ファイルのパスは適宜変更してください

const topImages = [
  "IMG_0649.png",
  "AA.jpg",
  "/image_three.png",
  // ... 他の画像のパスを追加
];

const App: React.FC = () => {
  const numberOfTopImages = 3;

  return (
    <div>
      <h1>My App</h1>
      <DisplayPage numberOfTopImages={numberOfTopImages} topImages={topImages} />
    </div>
  );
};

export default App;
