/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ socket }) => {
  const [showResult, setShowResult] = useState(false);
  const [showResultLose, setShowResultLose] = useState(false);
  const [testPassed, setTestPassed] = useState(0);
  const [htmlCode, setHtmlCode] = useState(`<nav id="navbar">
  <span>home</span>
  <span>about</span>
  <span>contact us</span>
  <span>login</span>
  <span>logout</span>
</nav>
<section id="main-section">
  <div class="box">
    Coding is Life, love to code
  </div>
</section>
<footer>
</footer>`);
  const [cssCode, setCssCode] = useState(`body {
    margin: 0;
    overflow: hidden;
    font-family: 'Courier New', Courier, monospace;
}

#navbar {
    background-color: rgb(59, 54, 54);
    padding: 1rem;
    top: 0;
    color: white;
    position: fixed;
    width: 100vw;
    justify-content: space-evenly;
}

.box {
    height: 32rem;
    width: 100%;
    background-color: rgb(42, 159, 159);
    font-size: 4.5rem;
}`);
  const [jsCode, setJsCode] = useState(``);

  const runTestCases = () => {
    const iframe = document.getElementById("preview-iframe");

    const navbar = iframe.contentDocument.getElementById("navbar");
    const mainSection = iframe.contentDocument.getElementById("main-section");

    const navbarBottom = navbar.offsetTop + navbar.offsetHeight;
    const mainSectionTop = mainSection.offsetTop;
    console.log({
      navbarBottom,
      mainSectionTop
    })
    if (navbarBottom <= mainSectionTop) {
      setTestPassed((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (testPassed === 2) {
      setShowResult(true);
      socket?.emit("win", 0);
    }
  }, [testPassed]);

  const handleHtmlChange = (value) => {
    setHtmlCode(value);
  };

  const handleCssChange = (value) => {
    setCssCode(value);
  };

  const handleJsChange = (value) => {
    setJsCode(value);
  };

  const handleSubmit = () => {};

  const combinedCode = `
    <html>
      <head>
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode}
        <script type="text/javascript">
          ${jsCode}
        </script>
      </body>
    </html>
  `;

  useEffect(() => {
    socket?.on("winX", () => {
      setShowResultLose(true);
    });
  }, [socket]);

  return (
    <div className="wrapper">
      <div className="grid h-screen grid-cols-2">
        <div className="editors grid h-screen grid-rows-3">
          <div className="html flex flex-col">
            <h2 className="relative z-10 bg-black px-4 py-2 text-white">
              HTML Editor
              { testPassed }
            </h2>
            <Editor
              defaultLanguage="html"
              defaultValue={htmlCode}
              onChange={handleHtmlChange}
              className="flex-1"
              theme="vs-dark"
            />
          </div>
          <div className="css flex flex-col">
            <h2 className="relative z-10 bg-black px-4 py-2 text-white">
              CSS Editor
            </h2>
            <Editor
              defaultLanguage="css"
              defaultValue={cssCode}
              onChange={handleCssChange}
              className="flex-1"
              theme="vs-dark"
            />
          </div>
          <div className="js flex flex-col">
            <h2 className="relative z-10 bg-black px-4 py-2 text-white">
              JS Editor
            </h2>
            <Editor
              defaultLanguage="javascript"
              defaultValue={jsCode}
              onChange={handleJsChange}
              className="flex-1"
              theme="vs-dark"
            />
          </div>
        </div>
        <div className="right relative flex h-screen flex-col">
          <div className="btns flex gap-4 px-4 py-2">
            <button
              className="rounded-full border border-b-4 border-black bg-white px-8 py-2 font-bold"
              onClick={runTestCases}
            >
              Run Test
            </button>
            <button
              className="rounded-full border border-b-4 border-black bg-[#b5eac7] px-8 py-2 font-bold"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          <iframe
            id="preview-iframe"
            title="Preview"
            width="100%"
            className="flex-1 border-2"
            srcDoc={combinedCode}
          ></iframe>
        </div>
        <div>
          {showResult && (
            <div className="result fixed bottom-0 right-0 m-4 p-4 bg-white rounded-lg shadow-lg">
              <h2>Result</h2>
              <p>You Win!!</p>
              <p>Test cases passed: {testPassed}</p>
            </div>
          )}
          {!showResult && showResultLose && (
            <div className="result fixed bottom-0 right-0 m-4 p-4 bg-white rounded-lg shadow-lg">
              <h2>Result</h2>
              <p>You Lose!!</p>
              <p>Test cases passed: {testPassed}</p>
            </div>
          )}
        </div>
      </div>
      <div className="problem-statement container-custom my-8 rounded-md bg-slate-200 px-8 py-4">
        <div className="flex mb-4 gap-2 items-center"><h2 className="text-2xl font-bold">238. Fix Navbar</h2> <p className="py-1 inline-block rounded-3xl px-6 bg-green-300 text-green-900">Easy</p></div>
        <p>
          The navbar is colliding with the content.
          {/* <br></br> */}
          The content should start below the navbar.
          <br></br>
          <i>constraints: The navbar should be fixed at the top of the page</i>
        </p>
      </div>
    </div>
  );
};

export default CodeEditor;
