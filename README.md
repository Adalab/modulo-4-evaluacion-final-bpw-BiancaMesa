# Taylor Swift Songs & Albums API 🦋🗽💄🐍🪐❤️🔮✨🎤🎙️ #
This is an API that contains information about the songs and the albums of Taylor Swift. 
Moreover, not only can you consult that information but you can also add new songs and modify or delete the existing ones (if you see any mistake).

# Technologies Used 🏹 #
- MySQL: to create the database 
- Node.js
- Postman

# Setting up the project 🖥️ #
1. **Clone the repository from:**   
    https://github.com/Adalab/modulo-4-evaluacion-final-bpw-BiancaMesa.git
2. **Open the project using your code editor (Visual Studio Code or any other)**
3. **Install node modules with all the local dependencies:**    
    ``` npm install ```
4. **Start the project:**    
    ``` npm run dev ```

## See all the songs 🌃💫## 
Front-end must: 
- Use the method get
- Use the route: **/songs**

## See one song 🦋 ##   
Front-end must: 
- Use the method get
- Use the route: **/songs/:id**
- Send as url params the id of the song you want to see.

## See all the albums 🔮 ##  
Front-end must: 
- Use the method get
- Use the route: **/albums**

## Add a new song 💎 ##  
Front-end must: 
- Use the method post
- Use the route: **/songs**
- Send as body params the information relating to the song, music_video, writers and album_id, and in that order.

## Modify an existing song ⚡️ ## 
Front-end must: 
- Use the method put
- Use the route: **/songs/:id**
- Front-end must send as url params the id of the song and in the method put the information relating to the song, music_video, writers and album_id, and in that order.

