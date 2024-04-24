# Web Compiler

This is a web compiler project designed to take JSON input and produce HTML output. It features directory-based routing, ensuring that the website follows the same routing as the directory structure. One of the key highlights of this project is its blazingly fast code compilation.

## Features

- **JSON to HTML Compilation:** Accepts JSON input and generates HTML output.
- **Directory-Based Routing:** Website routing follows the directory structure.
- **High Performance:** Offers fast code compilation for efficient development.

## Usage

1. **Input JSON:** Provide JSON input according to the specified format.
2. **Compile:** Run the compiler to generate HTML output.
3. **Output HTML:** Obtain the compiled HTML output for deployment or further processing.

## Getting Started

To get started with the Web Compiler, follow these steps:

1. Clone this repository:

    ```bash
    git clone https://github.com/deadland2002/json-web-compile.git
    ```

2. Install dependencies:

    ```bash
    cd json-web-compile
    npm install
    ```

3. Start the compiler:

    ```bash
    npm start
    ```

4. Access the compiler through your web browser.

## JSON Input Format

The JSON input should adhere to the specified format for successful compilation. Example:

```ts
interface InputType {
    title: string;
    page: {
        header: {
            logo: string;
        };
        tabs: {
            path: string;
            link: string;
        }[];
        sidebar: {
            title: string;
            link: string;
        }[];
        body: BodyKeys[]
    };
}

interface BodyKeys {
    type: 'heading1' | 'heading2' | 'heading3' | 'heading4' | 'link' | 'code' | 'para';
    content: string;
    special?:string
    children ?: BodyKeys[];
}

export {InputType}
```

## Input

this code uses directory based routing , so to begin 

- Create a page.json file inside input folder
- to create a path like "/test" , create a file as input -> test -> page.json
- Your directory will look like 
```
input
|------> page.json
|------> test
         |-----> page.json
```
- Start the compiler:

    ```bash
    npm start
    ```
