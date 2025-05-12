import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import AuthFormComponent from './components/AuthFormComponent';
import PostFormComponent from './components/PostFormComponent';
import PostComponent from './components/PostComponent';

const API_URL='http://localhost:3000';

export default function App() {
  const [username,SetUsername]=useState('');
  const [password,SetPassword]=useState('');
  const [token,setToken]=useState(null);
  const [posts,setPosts]=useState([]);
  const [title,setTitle]=useState('');
  const [content,setContent]=useState('');
  const [editId,setEditId]=useState(null);

  const axiosInstance=axios.create({
    baseURL:API_URL,
    headers:{Authorization:token? `Bearer ${token}`:''},
  });

  useEffect(
    ()=>{
      const loadToken=async()=>{
       const savedToken=await AsyncStorage.getItem('token');
       if(savedToken) setToken(savedToken);
      };
      loadToken();

    },[]
  );

  const fetchPosts=async()=>{
    try{
      const response=await axiosInstance.get('/posts');
      setPosts(response.data);
    }
    catch(err)
    {
      console.error('error featching posts:',err);
    }
  }

  useEffect(()=>{
    if(token) fetchPosts();
  },[token]
  );

  //register
  const register=async()=>{
    try{
     await axios.post(`${API_URL}/register`,{username,password});
     alert('User registered');
    }
    catch(err)
    {
      console.error('Error registering:',err)
    }
  }
 
  //login
  const login=async()=>{
    try{
      const response=await axios.post(`${API_URL}/login`,{username,password});
      setToken(response.data.token);
     await AsyncStorage.setItem('token',response.data.token);
     SetUsername('');
     SetPassword('');
    }
    catch(err)
    {
      console.error('Erorr logging in:',err);
    }
  }

  //create post
  const createPost=async()=>{
    try{
     const response=await axiosInstance.post('/posts',{title,content});
     setPosts([...posts,response.data]);
     setTitle('');
     setContent('');
    }
    catch(err)
    {
      console.error('Error creating post:',err)
    }
  }

  //delete post
  const deletePost=async(id)=>{
    try{
      await axiosInstance.delete(`/posts/${id}`)
      setPosts(posts.filter(post=>post.id!==id));

    }
    catch(err)
    {
      console.error('Error deleting post:',err)
    }
  }

  //update post
  const updatePost=async(id)=>{
    try{
      const response=await axiosInstance.put(`/posts/${id}`,{title,content})
      setPosts(posts.map(post=>(post.id===id?response.data:post)));
      setTitle('');
      setContent('');
      setEditId(null);

    }
    catch(err)
    {
      console.error('Error updating post:',err)
    }
  }

  if(!token)
  {
    return (
      <AuthFormComponent username={username} password={password} 
        onUsernameChange={SetUsername} onPasswordChange={SetPassword} 
        onRegister={register} onLogin={login}/>
    );
  }
  return(
    <View style={{flex:1, padding:20}}>
      <Text style={{fontSize:20,marginBottom:10}}>Posts</Text>
      <Button title='Logout' onPress={async()=>{
        setToken(null);
        await AsyncStorage.removeItem('token');
      }}/>

      <PostFormComponent title={title} content={content} onTitleChange={setTitle} onContentChange={setContent} onSubmit={()=>(editId? updatePost(editId):createPost())} isEditing={editId} />


      <FlatList
      data={posts}
      keyExtractor={item=>item.id.toString()}
      renderItem={({item})=>(
        <PostComponent item={item} onEdit={()=>{
            setTitle(item.title); 
            setContent(item.content); 
            setEditId(item.id); 
          }} 
          onDelete={()=>deletePost(item.id)} />
        )}
      />
    </View>
  )
  
}
