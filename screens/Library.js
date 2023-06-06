import { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  TextInput,
} from "react-native";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import PdfReader from '@bildau/rn-pdf-reader';
import Modal from "react-native-modal";
import DocmentPicker from 'react-native-document-picker';


import { FlatListSlider } from "react-native-flatlist-slider";
import { Linking } from "react-native";
import TokenContext from "../slices/TokenCOntext";

const { width } = Dimensions.get("window");

const Library = ({ navigation }) => {
  const tokenContext = useContext(TokenContext);

  const [isLoading,setIsLoading] = useState(false);
  const images = [
    {
      image:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1618365908648-e71bd5716cba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1598618443855-232ee0f819f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzF8fGJvb2slMjBjb3ZlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <View className="h-[50px] bg-[#0F123F]">
          <View className="flex-row items-center">
            <TouchableOpacity className="px-5 mt-3">
              <FontAwesome5
                name="bars"
                size={25}
                color="white"
                onPress={() => {
                  navigation.openDrawer();
                }}
              />
            </TouchableOpacity>
            <View className="w-[70%] items-center justify-center">
              <Text className="mt-2 text-white text-[22px] font-extrabold">
                Digital Library
              </Text>
            </View>
            <TouchableOpacity className="px-5 mt-3">
              <FontAwesome5 name="bell" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ),
    });
  }, []);

  const [isHome, setIsHome] = useState(true);
  const [isNotes, setIsNotes] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isLecture, setIsLecture] = useState(false);
  const [isPaper, setIsPaper] = useState(false);

  const [books, setbooks] = useState(null);
  const getBooks = async () => {
    try {
      await fetch("https://django-server-production-7222.up.railway.app/books/", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: "Bearer " + tokenContext.Token,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.ok) {
            const json = res.json();
            return json;
          } else {
            throw res.json;
          }
        })
        .then((data) => {
          console.log(data);
          setbooks(data.data);
        })
        .catch((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      navigation.navigate("Home");
    }
  };
  const [notes, setNotes] = useState(null);
  const getNotes = async () => {
    try {
      await fetch("https://django-server-production-7222.up.railway.app/notes/", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: "Bearer " + tokenContext.Token,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.ok) {
            const json = res.json();
            return json;
          } else {
            throw res.json;
          }
        })
        .then((data) => {
          console.log(data);
          setNotes(data.data);
        })
        .catch((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      navigation.navigate("Home");
    }
  };
  const [lectures, setLectures] = useState(null);
  const getLectures = async () => {
    try {
      await fetch("https://django-server-production-7222.up.railway.app/lecture/", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: "Bearer " + tokenContext.Token,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.ok) {
            const json = res.json();
            return json;
          } else {
            throw res.json;
          }
        })
        .then((data) => {
          console.log(data);
          setLectures(data.data);
        })
        .catch((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      navigation.navigate("Home");
    }
  };
  const [papers, setPapers] = useState(null);
  const getPapers = async () => {
    try {
      await fetch("https://django-server-production-7222.up.railway.app/paper/", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: "Bearer " + tokenContext.Token,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.ok) {
            const json = res.json();
            return json;
          } else {
            throw res.json;
          }
        })
        .then((data) => {
          console.log(data);
          setPapers(data.data);
        })
        .catch((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      navigation.navigate("Home");
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getBooks();
    getNotes();
    getLectures();
    getPapers();
    setIsLoading(false);
  },[]);

  const Books = [
    {
      img: "https://img.freepik.com/free-vector/abstract-green-business-book-cover-page-brochure-template_1017-13933.jpg",
    },
    {
      img: "https://img.freepik.com/free-vector/abstract-green-business-book-cover-page-brochure-template_1017-13934.jpg",
    },
    {
      img: "https://img.freepik.com/free-vector/abstract-green-business-book-cover-page-brochure-template_1017-13935.jpg",
    },
    {
      img: "https://img.freepik.com/free-vector/abstract-green-business-book-cover-page-brochure-template_1017-13936.jpg",
    },
    {
      img: "https://img.freepik.com/free-vector/abstract-green-business-book-cover-page-brochure-template_1017-13937.jpg",
    },
    {
      img: "https://img.freepik.com/free-vector/abstract-green-business-book-cover-page-brochure-template_1017-13938.jpg",
    },
    {
      img: "https://img.freepik.com/free-vector/abstract-green-business-book-cover-page-brochure-template_1017-13939.jpg",
    },
    {
      img: "https://img.freepik.com/free-vector/abstract-green-business-book-cover-page-brochure-template_1017-13932.jpg",
    },
  ];

  const bookData = [];
  if (books != null) {
    for (let i = 0; i < books.length; i++) {
      bookData.push({ title: books[i].title, link: books[i].content });
    }
  }

  const notesData = [];
  if (notes != null) {
    for (let i = 0; i < notes.length; i++) {
      notesData.push({
        title: notes[i].title,
        link: notes[i].content,
        category: notes[i].category,
      });
    }
  }

  const lectureData = [];
  if (lectures != null) {
    for (let i = 0; i < lectures.length; i++) {
      lectureData.push({ title: lectures[i].title, link: lectures[i].link });
    }
  }

  const paperData = [];
  if (papers != null) {
    for (let i = 0; i < papers.length; i++) {
      paperData.push({ title: papers[i].subject, link: papers[i].content });
    }
  }

  const [title, setTitle] = useState("Books Section");
  const [isViewMore, setIsViewMore] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [pdfHeading, setPdfHeading] = useState(null);
  const [topic,setTopic] = useState(null);
  const [uploadData,setUploadData] = useState(null);
  const [selectedFile,setSelectedFile] = useState(null);

  const selectDocument=async()=>{
    try{
        const res = await DocmentPicker.pick({
            type:DocmentPicker.types.pdf
        })
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
        if(topic==null || topic.trim()==""){
          alert("Please Enter title");
        }else{
          setUploadData({
            "title":topic,
            "file":res
          })
        }
        setSelectedFile(res.name)
    }catch (err) {
        //Handling any exception (If any)
        if (DocumentPicker.isCancel(err)) {
          //If user canceled the document selection
          alert('Canceled from multiple doc picker');
        } else {
          //For Unknown Error
          alert('Unknown Error: ' + JSON.stringify(err));
          throw err;
        }
}}

const uploadDocument=async()=>{
  try{
      await fetch('https://django-server-production-7222.up.railway.app/addnotes/',{
          method:'POST',
          credentials:'include',
          body:uploadData,
          headers:{
              "Authorization":"Bearer "+tokenContext.Token,
              'Content-Type': 'multipart/form-data',
          },
      }).then((res)=>{
          console.log(res)
          if(res.ok){
              const json = res.json();
              return json
          }else{
              throw res.json;
          }
      }).then((data)=>{
          console.log(data)
          alert(data.msg)
      }).catch((data)=>{console.log(data)});
  }catch (error) {
      console.log(error);
      setIsLoading(false);
      navigation.navigate("Home")
  }
}

  return (
    <View className='flex-1'>
      {isLoading || bookData.length==0 || notesData.length==0 || paperData.length==0 || lectureData.length==0?(
      <View className='bg-[#F8F8FF] flex-1 relative justify-center items-center'>
                <Image source={require('../assets/images/loader.gif')} className='h-[30%] w-[100%]' />
            </View>
    ):(
      <SafeAreaView className="bg-[#F8F8FF] flex-1 items-center">
      <View className="h-10 w-[95%] mt-5 bg-[#FFA3A3] rounded-[10px] flex-row items-center justify-end">
        <View className="m-2 right-[12px] h-6 w-[35%] bg-white rounded-[10px] items-center justify-center">
          <Text>{title}</Text>
        </View>
        <Text className="mr-7 text-[#800000] text-[18px] font-bold">
          Never Stop Learning
        </Text>
      </View>

      <View className="h-10 w-[95%] mt-3 flex-row items-center justify-between">
        <TouchableOpacity
          className="h-6 w-[15%] rounded-[10px] bg-white border-[2px] border-[#B2A0FF] justify-center items-center"
          onPress={() => {
            setIsHome(true);
            setIsNotes(false);
            setIsAdd(false);
            setIsLecture(false);
            setIsPaper(false);
            setTitle("Books Section");
          }}
        >
          <MaterialCommunityIcons name="home" size={22} color="#B2A0FF" />
          {isHome || isViewMore ? (
            <View className="h-[2px] top-2 w-[100%] rounded-[10px] bg-[#B2A0FF]" />
          ) : (
            <View className="h-[2px] top-2 w-[100%]" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="h-6 w-[15%] rounded-[10px] bg-white border-[2px] border-[#6FCF97] justify-center items-center"
          onPress={() => {
            setIsHome(false);
            setIsNotes(true);
            setIsAdd(false);
            setIsLecture(false);
            setIsViewMore(false);
            setIsPaper(false);
            setTitle("Notes Section");
          }}
        >
          <MaterialCommunityIcons
            name="notebook-multiple"
            size={18}
            color="#6FCF97"
          />
          {isNotes ? (
            <View className="h-[2px] top-2 w-[100%] rounded-[10px] bg-[#6FCF97]" />
          ) : (
            <View className="h-[2px] top-2 w-[100%]" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="h-6 w-[10%] rounded-[10px] bg-white border-[2px] border-[#0F123F] justify-center items-center"
          onPress={() => {
            setIsHome(false);
            setIsNotes(false);
            setIsAdd(true);
            setIsLecture(false);
            setIsViewMore(false);
            setIsPaper(false);
            setTitle("Add Notes");
          }}
        >
          <Ionicons name="ios-add-circle" size={20} color="#0F123F" />
          {isAdd ? (
            <View className="h-[2px] top-2 w-[100%] rounded-[10px] bg-[#0F123F]" />
          ) : (
            <View className="h-[2px] top-2 w-[100%]" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="h-6 w-[15%] rounded-[10px] bg-white border-[2px] border-[#FFC176] justify-center items-center"
          onPress={() => {
            setIsHome(false);
            setIsNotes(false);
            setIsAdd(false);
            setIsLecture(true);
            setIsViewMore(false);
            setIsPaper(false);
            setTitle("Lectures");
          }}
        >
          <MaterialIcons name="video-library" size={20} color="#FFC176" />
          {isLecture ? (
            <View className="h-[2px] top-2 w-[100%] rounded-[10px] bg-[#FFC176]" />
          ) : (
            <View className="h-[2px] top-2 w-[100%]" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="h-6 w-[15%] rounded-[10px] bg-white border-[2px] border-[#CD7A3E] justify-center items-center"
          onPress={() => {
            setIsHome(false);
            setIsNotes(false);
            setIsAdd(false);
            setIsLecture(false);
            setIsViewMore(false);
            setIsPaper(true);
            setTitle("Exam Papers");
          }}
        >
          <MaterialCommunityIcons
            name="format-list-checkbox"
            size={20}
            color="#CD7A3E"
          />
          {isPaper ? (
            <View className="h-[2px] top-2 w-[100%] rounded-[10px] bg-[#CD7A3E]" />
          ) : (
            <View className="h-[2px] top-2 w-[100%]" />
          )}
        </TouchableOpacity>
      </View>

      {isHome ? (
        <ScrollView className="h-[82%] w-[100%] mt-3">
          <View className="h-40 w-[95%] bg-black px-2 rounded-[10px] mx-2 my-2 justify-center items-center">
            <FlatListSlider
              data={images}
              imageKey={"image"}
              indicatorActiveWidth={20}
              timer={5000}
              onPress={() => null}
              indicatorContainerStyle={{ position: "absolute", bottom: 5 }}
              indicatorActiveColor={"#B2A0FF"}
              indicatorInActiveColor={"#ffffff"}
              animation
            />
          </View>

          <View className="h-10 w-[95%] mx-2 mt-2 rounded-[10px] justify-start">
            <Text className="mx-2 text-[18px] font-extrabold">
              Continue Reading
            </Text>
            <View className="mx-2 top-1 h-[3px] w-[95%] bg-[#B2A0FF] rounded-[10px]"></View>
          </View>

          <View className="h-40 w-[95%] mx-2 rounded-[10px]">
            <ScrollView
              ref={(scrollView) => {
                this.scrollView = scrollView;
              }}
              className="h-[100%] w-[95%] mx-2"
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              decelerationRate={0}
              snapToOffsets={Books.map((x, i) => i * (width - 60))}
              snapToAlignment={"start"}
              contentInset={{
                top: 0,
                left: 30,
                bottom: 0,
                right: 30,
              }}
            >
              {bookData.map((x, i) => (
                <TouchableOpacity
                  style={[styles.view1]}
                  className="justify-center items-center"
                  onPress={() => {
                    setIsShow(true);
                    setPdfHeading(x.title);
                  }}
                >
                  <View className="h-[80%] my-2 w-[95%] bg-white rounded-[10px] justify-center items-center">
                    <Image
                      key={i}
                      source={{ uri: Books[i].img }}
                      className="h-[100%] w-[100%] rounded-[10px]"
                    />
                  </View>
                  <Text className="text-center">{x.title}</Text>
                  {/* <View className='h-[20%] w-[95%] bg-[#B2A0FF] rounded-[10px] justify-center items-center'><Text className='text-white font-extrabold'>View</Text></View> */}
                  <Modal
                    isVisible={isShow}
                    backdropOpacity={0.2}
                    animationIn="slideInUp"
                  >
                    <View className="h-[80%] bg-white rounded-[10px]">
                      <View className="h-10 bg-[#111441] flex-row rounded-t-[10px] justify-between px-5">
                        <TouchableOpacity
                          className="mt-2"
                          onPress={() => {
                            Linking.openURL(x.link);
                            setIsShow(false);
                          }}
                        >
                          <FontAwesome5 name="download" size={24} color="white" />
                        </TouchableOpacity>
                        <View className="w-[80%] justify-center items-center">
                          <Text className="text-white text-[20px] font-extrabold">
                            {pdfHeading}
                          </Text>
                        </View>
                        <TouchableOpacity
                          className="mt-2"
                          onPress={() => {
                            setIsShow(false);
                          }}
                        >
                          <MaterialCommunityIcons
                            name="close"
                            size={24}
                            color="white"
                          />
                        </TouchableOpacity>
                      </View>
                      <PdfReader
                        withScroll
                        withPinchZoom
                        source={{
                          uri: x.link,
                        }}
                      />
                    </View>
                  </Modal>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[styles.view1]}
                className="justify-center items-center"
                onPress={() => {
                  setIsViewMore(true);
                  setIsHome(false);
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-right-circle-outline"
                  size={30}
                  color="#939393"
                />
                <Text className="text-[#939393]">View More</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View className="h-10 w-[95%] mx-2 rounded-[10px] justify-start">
            <Text className="mx-2 text-[18px] font-extrabold">
              Recommended Books
            </Text>
            <View className="mx-2 top-1 h-[3px] w-[95%] bg-[#B2A0FF] rounded-[10px]"></View>
          </View>

          <View className="h-40 w-[95%] mx-2 rounded-[10px]">
            <ScrollView
              ref={(scrollView) => {
                this.scrollView = scrollView;
              }}
              className="h-[100%] w-[95%] mx-2"
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              decelerationRate={0}
              snapToOffsets={Books.map((x, i) => i * (width - 60))}
              snapToAlignment={"start"}
              contentInset={{
                top: 0,
                left: 30,
                bottom: 0,
                right: 30,
              }}
            >
              {bookData.map((x, i) => (
                <TouchableOpacity
                  style={[styles.view1]}
                  className="justify-center items-center"
                  onPress={() => {
                    setIsShow(true);
                    setPdfHeading(x.title);
                  }}
                >
                  <View className="h-[80%] my-2 w-[95%] bg-white rounded-[10px] justify-center items-center">
                    <Image
                      key={i}
                      source={{ uri: Books[i].img }}
                      className="h-[100%] w-[100%] rounded-[10px]"
                    />
                  </View>
                  <Text className="text-center">{x.title}</Text>
                  {/* <View className='h-[20%] w-[95%] bg-[#B2A0FF] rounded-[10px] justify-center items-center'><Text className='text-white font-extrabold'>View</Text></View> */}
                  <Modal
                    isVisible={isShow}
                    backdropOpacity={0.2}
                    animationIn="slideInUp"
                  >
                    <View className="h-[80%] bg-white rounded-[10px]">
                      <View className="h-10 bg-[#111441] flex-row rounded-t-[10px] justify-between px-5">
                        <TouchableOpacity
                          className="mt-2"
                          onPress={() => {
                            Linking.openURL(x.link);
                            setIsShow(false);
                          }}
                        >
                          <FontAwesome5 name="download" size={24} color="white" />
                        </TouchableOpacity>
                        <View className="w-[80%] justify-center items-center">
                          <Text className="text-white text-[20px] font-extrabold">
                            {pdfHeading}
                          </Text>
                        </View>
                        <TouchableOpacity
                          className="mt-2"
                          onPress={() => {
                            setIsShow(false);
                          }}
                        >
                          <MaterialCommunityIcons
                            name="close"
                            size={24}
                            color="white"
                          />
                        </TouchableOpacity>
                      </View>
                      <PdfReader
                        withScroll
                        withPinchZoom
                        source={{
                          uri: x.link,
                        }}
                      />
                    </View>
                  </Modal>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={[styles.view1]}
                className="justify-center items-center"
              >
                <MaterialCommunityIcons
                  name="arrow-right-circle-outline"
                  size={30}
                  color="#939393"
                />
                <Text className="text-[#939393]">View More</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ScrollView>
      ) : null}

      {isNotes ? (
        <ScrollView className="h-[82%] w-[100%] mt-3">
          <View className="h-10 w-[95%] mx-2 mt-2 rounded-[10px] justify-start">
            <Text className="mx-2 text-[18px] font-extrabold">
              Teacher's Notes
            </Text>
            <View className="mx-2 top-1 h-[3px] w-[95%] bg-[#6FCF97] rounded-[10px]"></View>
          </View>

          <View className="h-40 w-[95%] mx-2 rounded-[10px]">
            <ScrollView
              ref={(scrollView) => {
                this.scrollView = scrollView;
              }}
              className="h-[100%] w-[95%] mx-2"
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              decelerationRate={0}
              snapToOffsets={Books.map((x, i) => i * (width - 60))}
              snapToAlignment={"start"}
              contentInset={{
                top: 0,
                left: 30,
                bottom: 0,
                right: 30,
              }}
            >
              {notesData.map((x, i) => (
                <TouchableOpacity
                  style={[styles.view1]}
                  className="justify-center items-center"
                  onPress={() => {
                    setIsShow(true);
                    setPdfHeading(x.title);
                  }}
                >
                  <View className="h-[80%] my-2 w-[95%] bg-white rounded-[10px] justify-center items-center">
                    <Image
                      key={i}
                      source={{ uri: Books[i].img }}
                      className="h-[100%] w-[100%] rounded-[10px]"
                    />
                  </View>
                  <Text className="text-center">{x.title}</Text>
                  {/* <View className='h-[20%] w-[95%] bg-[#B2A0FF] rounded-[10px] justify-center items-center'><Text className='text-white font-extrabold'>View</Text></View> */}
                  <Modal
                    isVisible={isShow}
                    backdropOpacity={0.2}
                    animationIn="slideInUp"
                  >
                    <View className="h-[80%] bg-white rounded-[10px]">
                      <View className="h-10 bg-[#111441] flex-row rounded-t-[10px] justify-between px-5">
                        <TouchableOpacity
                          className="mt-2"
                          onPress={() => {
                            Linking.openURL(x.link);
                            setIsShow(false);
                          }}
                        >
                          <FontAwesome5 name="download" size={24} color="white" />
                        </TouchableOpacity>
                        <View className="w-[80%] justify-center items-center">
                          <Text className="text-white text-[20px] font-extrabold">
                            {pdfHeading}
                          </Text>
                        </View>
                        <TouchableOpacity
                          className="mt-2"
                          onPress={() => {
                            setIsShow(false);
                          }}
                        >
                          <MaterialCommunityIcons
                            name="close"
                            size={24}
                            color="white"
                          />
                        </TouchableOpacity>
                      </View>
                      <PdfReader
                        withScroll
                        withPinchZoom
                        source={{
                          uri: x.link,
                        }}
                      />
                    </View>
                  </Modal>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={[styles.view2]}
                className="justify-center items-center"
              >
                <MaterialCommunityIcons
                  name="arrow-right-circle-outline"
                  size={30}
                  color="#939393"
                />
                <Text className="text-[#939393]">View More</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View className="h-10 w-[95%] mx-2 mt-2 rounded-[10px] justify-start">
            <Text className="mx-2 text-[18px] font-extrabold">
              Student's Notes
            </Text>
            <View className="mx-2 top-1 h-[3px] w-[95%] bg-[#6FCF97] rounded-[10px]"></View>
          </View>

          <View className="h-40 w-[95%] mx-2 rounded-[10px]">
            <ScrollView
              ref={(scrollView) => {
                this.scrollView = scrollView;
              }}
              className="h-[100%] w-[95%] mx-2"
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              decelerationRate={0}
              snapToOffsets={Books.map((x, i) => i * (width - 60))}
              snapToAlignment={"start"}
              contentInset={{
                top: 0,
                left: 30,
                bottom: 0,
                right: 30,
              }}
            >
              {notesData.map((x, i) =>
                                <TouchableOpacity style={[styles.view1,]} className='justify-center items-center' onPress={()=>{setIsShow(true); setPdfHeading(x.title)}}>
                                    <View className='h-[80%] my-2 w-[95%] bg-white rounded-[10px] justify-center items-center'>
                                        <Image key={i} source={{uri:Books[i].img}} className='h-[100%] w-[100%] rounded-[10px]'/>
                                    </View>
                                    <Text className="text-center">{x.title}</Text>
                                    {/* <View className='h-[20%] w-[95%] bg-[#B2A0FF] rounded-[10px] justify-center items-center'><Text className='text-white font-extrabold'>View</Text></View> */}
                                    <Modal isVisible={isShow} backdropOpacity={0.2} animationIn="slideInUp">
                                                    <View className='h-[80%] bg-white rounded-[10px]'>
                                                        <View className='h-10 bg-[#111441] flex-row rounded-t-[10px] justify-between px-5'>
                                                            <TouchableOpacity className='mt-2' onPress={()=>{Linking.openURL(x.link);setIsShow(false)}}>
                                                              <FontAwesome5 name="download" size={24} color="white" />
                                                            </TouchableOpacity>
                                                            <View className='w-[80%] justify-center items-center'>
                                                                <Text className='text-white text-[20px] font-extrabold'>{pdfHeading}</Text>
                                                            </View>
                                                            <TouchableOpacity className='mt-2' onPress={()=>{setIsViewed(false)}}>
                                                                <MaterialCommunityIcons name="close" size={24} color="white"/>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <PdfReader withScroll withPinchZoom source={{
                                                            uri:x.link
                                                        }}/>            
                                                    </View>
                                                </Modal>
                                </TouchableOpacity>
                            )}

              <TouchableOpacity
                style={[styles.view2]}
                className="justify-center items-center"
              >
                <MaterialCommunityIcons
                  name="arrow-right-circle-outline"
                  size={30}
                  color="#939393"
                />
                <Text className="text-[#939393]">View More</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View className="h-10 w-[95%] mx-2 mt-2 rounded-[10px] justify-start">
            <Text className="mx-2 text-[18px] font-extrabold">
              Web-Source Notes
            </Text>
            <View className="mx-2 top-1 h-[3px] w-[95%] bg-[#6FCF97] rounded-[10px]"></View>
          </View>

          <View className="h-40 w-[95%] mx-2 mb-2 rounded-[10px]">
            <ScrollView
              ref={(scrollView) => {
                this.scrollView = scrollView;
              }}
              className="h-[100%] w-[95%] mx-2"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              decelerationRate={0}
              snapToOffsets={Books.map((x, i) => i * (width - 60))}
              snapToAlignment={"start"}
              contentInset={{
                top: 0,
                left: 30,
                bottom: 0,
                right: 30,
              }}
            >
              {notesData.map((x, i) =>
                                <TouchableOpacity style={[styles.view1,]} className='justify-center items-center' onPress={()=>{setIsShow(true); setPdfHeading(x.title)}}>
                                    <View className='h-[80%] my-2 w-[95%] bg-white rounded-[10px] justify-center items-center'>
                                        <Image key={i} source={{uri:Books[i].img}} className='h-[100%] w-[100%] rounded-[10px]'/>
                                    </View>
                                    <Text className="text-center">{x.title}</Text>
                                    {/* <View className='h-[20%] w-[95%] bg-[#B2A0FF] rounded-[10px] justify-center items-center'><Text className='text-white font-extrabold'>View</Text></View> */}
                                    <Modal isVisible={isShow} backdropOpacity={0.2} animationIn="slideInUp">
                                                    <View className='h-[80%] bg-white rounded-[10px]'>
                                                        <View className='h-10 bg-[#111441] flex-row rounded-t-[10px] justify-between px-5'>
                                                            <TouchableOpacity className='mt-2' onPress={()=>{Linking.openURL(x.link);setIsShow(false)}}>
                                                              <FontAwesome5 name="download" size={24} color="white" />
                                                            </TouchableOpacity>
                                                            <View className='w-[80%] justify-center items-center'>
                                                                <Text className='text-white text-[20px] font-extrabold'>{pdfHeading}</Text>
                                                            </View>
                                                            <TouchableOpacity className='mt-2' onPress={()=>{setIsViewed(false)}}>
                                                                <MaterialCommunityIcons name="close" size={24} color="white"/>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <PdfReader withScroll withPinchZoom source={{
                                                            uri:x.link
                                                        }}/>            
                                                    </View>
                                                </Modal>
                                </TouchableOpacity>
                            )}

              <TouchableOpacity
                style={[styles.view2]}
                className="justify-center items-center"
              >
                <MaterialCommunityIcons
                  name="arrow-right-circle-outline"
                  size={30}
                  color="#939393"
                />
                <Text className="text-[#939393]">View More</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ScrollView>
      ) : null}
      {isAdd ? (
        <ScrollView className="h-[82%] w-[100%] mt-3">
          <View className='pt-5 h-[300px] w-[90%] my-10 bg-white rounded-[10px] mx-5 items-center'>
            <Text className='text-[18px] text-[#0F123F] font-extrabold'>Add Your Contribution</Text>
            <View className='w-[90%] mt-10 flex-row gap-x-5 items-center'>
                <Text className='text-gray-700 text-[16px] w-[30%]'>Title</Text>
                <TextInput onChangeText={setTopic} className='px-4 bg-[#F8F8FF] text-gray-700 text-[16px] h-10 w-[60%] rounded-xl border-2 border-[#FFA3A3]'
                placeholder='Enter Topic Name'/>
            </View>
            <View className='w-[90%] mt-2 flex-row gap-x-5 items-center'>
                <Text className='text-gray-700 text-[16px] w-[30%]'>Upload File</Text>
                <TouchableOpacity className='mt-5 h-10 w-[60%] bg-[#F8F8FF] border-2 border-[#FFA3A3] rounded-[10px] justify-center items-center' onPress={()=>{selectDocument();}}>
                  <FontAwesome name="upload" size={24} color="#0F123F" />
                </TouchableOpacity>
            </View>
            {selectedFile!=null?(
              <Text className='text-red-600'>Selected File :{selectedFile}</Text>
            ):null}
            <TouchableOpacity className='mt-10 h-10 w-40 bg-[#0F123F] rounded-[10px] justify-center items-center' onPress={()=>uploadDocument()}>
              <Text className='text-white'>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : null}
      {isLecture ? (
        <View className="h-[100%] w-[100%] mt-3">
          {/* <View className='h-40 w-[95%] bg-black rounded-[10px] mx-2 my-2 justify-center items-center'>
                        <SliderBox images={images} sliderBoxHeight={200} parentWidth={350} dotColor="#FFA3A3" autoplay="true" circleLoop="true" autoplayInterval={3000}
                        ImageComponentStyle={{borderRadius: 15, width: '100%', marginTop: 5}} />
                    </View> */}

          <View className="h-10 w-[95%] mx-2 mt-2 rounded-[10px] justify-start">
            <Text className="mx-2 text-[18px] font-extrabold">
              Continue Watching
            </Text>
            <View className="mx-2 top-1 h-[3px] w-[95%] bg-[#FFC176] rounded-[10px]"></View>
          </View>

          <View className="h-[15%] w-[95%] mx-2 rounded-[10px]">
            <ScrollView
              ref={(scrollView) => {
                this.scrollView = scrollView;
              }}
              className="h-[100%] w-[95%] mx-2"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              decelerationRate={0}
              snapToOffsets={Books.map((x, i) => i * (width - 60))}
              snapToAlignment={"start"}
              contentInset={{
                top: 0,
                left: 30,
                bottom: 0,
                right: 30,
              }}
            >
              {lectureData.map((x, i) => (
                <View
                  style={[styles.view3]}
                  className="justify-center items-center"
                >
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(x.link);
                    }}
                    className="h-[80%] my-2 w-[95%] bg-white rounded-[10px] justify-center items-center"
                  >
                    <Image
                      key={i}
                      source={{ uri: Books[i].img }}
                      className="h-[100%] w-[100%] rounded-[10px]"
                    />
                  </TouchableOpacity>
                  <Text className="text-center">{x.title}</Text>
                  {/* <View className='h-[20%] w-[95%] bg-[#FFC176] rounded-[10px] justify-center items-center'><Text className='text-white font-extrabold'>View</Text></View> */}
                </View>
              ))}
              <TouchableOpacity
                style={[styles.view3]}
                className="justify-center items-center"
              >
                <MaterialCommunityIcons
                  name="arrow-right-circle-outline"
                  size={30}
                  color="#939393"
                />
                <Text className="text-[#939393]">View More</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View className="h-10 w-[95%] mx-2 rounded-[10px] justify-start">
            <Text className="mx-2 text-[18px] font-extrabold">
              Recommended Videos
            </Text>
            <View className="mx-2 top-1 h-[3px] w-[95%] bg-[#FFC176] rounded-[10px]"></View>
          </View>

          <View className="h-[50%] w-[95%] mx-2 rounded-[10px]">
            <ScrollView
              ref={(scrollView) => {
                this.scrollView = scrollView;
              }}
              className="h-[100%] w-[95%] mx-2"
              horizontal={false}
              showsVerticalScrollIndicator={false}
              decelerationRate={0}
              snapToOffsets={Books.map((x, i) => i * (width - 60))}
              snapToAlignment={"start"}
              contentInset={{
                top: 0,
                left: 30,
                bottom: 0,
                right: 30,
              }}
            >
              {lectureData.map((x, i) => (
                <View
                  style={[styles.view4]}
                  className="justify-center items-center"
                >
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(x.link);
                    }}
                    className="h-[80%] my-2 w-[100%] bg-white rounded-[10px] items-center flex-row"
                  >
                    <Image
                      key={i}
                      source={{ uri: Books[i].img }}
                      className="h-[90%] w-[20%] rounded-[10px] mx-5"
                    />
                    <Text className="text-center w-[60%]">{x.title}</Text>
                  </TouchableOpacity>
                  
                  {/* <View className='h-[20%] w-[95%] bg-[#FFC176] rounded-[10px] justify-center items-center'><Text className='text-white font-extrabold'>View</Text></View> */}
                </View>
              ))}
              <TouchableOpacity
                style={[styles.view4]}
                className="justify-center items-center"
              >
                <MaterialCommunityIcons
                  name="arrow-right-circle-outline"
                  size={30}
                  color="#939393"
                />
                <Text className="text-[#939393]">View More</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      ) : null}

      {isPaper ? (
        <ScrollView className="h-[82%] w-[100%] mt-3">
          <View className="h-10 w-[95%] mx-2 mt-2 rounded-[10px] justify-start">
            <Text className="mx-2 text-[18px] font-extrabold">
              Last Year Papers
            </Text>
            <View className="mx-2 top-1 h-[3px] w-[95%] bg-[#CD7A3E] rounded-[10px]"></View>
          </View>

          <View className="h-40 w-[95%] mx-2 rounded-[10px]">
            <ScrollView
              ref={(scrollView) => {
                this.scrollView = scrollView;
              }}
              className="h-[100%] w-[95%] mx-2"
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              decelerationRate={0}
              snapToOffsets={Books.map((x, i) => i * (width - 60))}
              snapToAlignment={"start"}
              contentInset={{
                top: 0,
                left: 30,
                bottom: 0,
                right: 30,
              }}
            >
              {paperData.map((x, i) => (
                <TouchableOpacity
                  style={[styles.view1]}
                  className="justify-center items-center"
                  onPress={() => {
                    setIsShow(true);
                    setPdfHeading(x.title);
                  }}
                >
                  <View className="h-[80%] my-2 w-[95%] bg-white rounded-[10px] justify-center items-center">
                    <Image
                      key={i}
                      source={{ uri: Books[i].img }}
                      className="h-[100%] w-[100%] rounded-[10px]"
                    />
                  </View>
                  <Text className="text-center">{x.title}</Text>
                  {/* <View className='h-[20%] w-[95%] bg-[#B2A0FF] rounded-[10px] justify-center items-center'><Text className='text-white font-extrabold'>View</Text></View> */}
                  <Modal
                    isVisible={isShow}
                    backdropOpacity={0.2}
                    animationIn="slideInUp"
                  >
                    <View className="h-[80%] bg-white rounded-[10px]">
                      <View className="h-10 bg-[#111441] flex-row rounded-t-[10px] justify-between px-5">
                        <TouchableOpacity
                          className="mt-2"
                          onPress={() => {
                            Linking.openURL(x.link);
                            setIsShow(false);
                          }}
                        >
                          <FontAwesome5 name="download" size={24} color="white" />
                        </TouchableOpacity>
                        <View className="w-[80%] justify-center items-center">
                          <Text className="text-white text-[20px] font-extrabold">
                            {pdfHeading}
                          </Text>
                        </View>
                        <TouchableOpacity
                          className="mt-2"
                          onPress={() => {
                            setIsShow(false);
                          }}
                        >
                          <MaterialCommunityIcons
                            name="close"
                            size={24}
                            color="white"
                          />
                        </TouchableOpacity>
                      </View>
                      <PdfReader
                        withScroll
                        withPinchZoom
                        source={{
                          uri: x.link,
                        }}
                      />
                    </View>
                  </Modal>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[styles.view2]}
                className="justify-center items-center"
              >
                <MaterialCommunityIcons
                  name="arrow-right-circle-outline"
                  size={30}
                  color="#939393"
                />
                <Text className="text-[#939393]">View More</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View className="h-10 w-[95%] mx-2 mt-2 rounded-[10px] justify-start">
            <Text className="mx-2 text-[18px] font-extrabold">
              Guess Papers
            </Text>
            <View className="mx-2 top-1 h-[3px] w-[95%] bg-[#CD7A3E] rounded-[10px]"></View>
          </View>

          <View className="h-40 w-[95%] mx-2 rounded-[10px]">
            <ScrollView
              ref={(scrollView) => {
                this.scrollView = scrollView;
              }}
              className="h-[100%] w-[95%] mx-2"
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              decelerationRate={0}
              snapToOffsets={Books.map((x, i) => i * (width - 60))}
              snapToAlignment={"start"}
              contentInset={{
                top: 0,
                left: 30,
                bottom: 0,
                right: 30,
              }}
            >
              {paperData.map((x, i) => (
                <TouchableOpacity
                  style={[styles.view1]}
                  className="justify-center items-center"
                  onPress={() => {
                    setIsShow(true);
                    setPdfHeading(x.title);
                  }}
                >
                  <View className="h-[80%] my-2 w-[95%] bg-white rounded-[10px] justify-center items-center">
                    <Image
                      key={i}
                      source={{ uri: Books[i].img }}
                      className="h-[100%] w-[100%] rounded-[10px]"
                    />
                  </View>
                  <Text className="text-center">{x.title}</Text>
                  {/* <View className='h-[20%] w-[95%] bg-[#B2A0FF] rounded-[10px] justify-center items-center'><Text className='text-white font-extrabold'>View</Text></View> */}
                  <Modal
                    isVisible={isShow}
                    backdropOpacity={0.2}
                    animationIn="slideInUp"
                  >
                    <View className="h-[80%] bg-white rounded-[10px]">
                      <View className="h-10 bg-[#111441] flex-row rounded-t-[10px] justify-between px-5">
                        <TouchableOpacity
                          className="mt-2"
                          onPress={() => {
                            Linking.openURL(x.link);
                            setIsShow(false);
                          }}
                        >
                          <FontAwesome5 name="download" size={24} color="white" />
                        </TouchableOpacity>
                        <View className="w-[80%] justify-center items-center">
                          <Text className="text-white text-[20px] font-extrabold">
                            {pdfHeading}
                          </Text>
                        </View>
                        <TouchableOpacity
                          className="mt-2"
                          onPress={() => {
                            setIsShow(false);
                          }}
                        >
                          <MaterialCommunityIcons
                            name="close"
                            size={24}
                            color="white"
                          />
                        </TouchableOpacity>
                      </View>
                      <PdfReader
                        withScroll
                        withPinchZoom
                        source={{
                          uri: x.link,
                        }}
                      />
                    </View>
                  </Modal>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[styles.view2]}
                className="justify-center items-center"
              >
                <MaterialCommunityIcons
                  name="arrow-right-circle-outline"
                  size={30}
                  color="#939393"
                />
                <Text className="text-[#939393]">View More</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View className="h-10 w-[95%] mx-2 mt-2 rounded-[10px] justify-start">
            <Text className="mx-2 text-[18px] font-extrabold">
              Web-Source Papers
            </Text>
            <View className="mx-2 top-1 h-[3px] w-[95%] bg-[#CD7A3E] rounded-[10px]"></View>
          </View>

          <View className="h-40 w-[95%] mx-2 mb-2 rounded-[10px]">
            <ScrollView
              ref={(scrollView) => {
                this.scrollView = scrollView;
              }}
              className="h-[100%] w-[95%] mx-2"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              decelerationRate={0}
              snapToOffsets={Books.map((x, i) => i * (width - 60))}
              snapToAlignment={"start"}
              contentInset={{
                top: 0,
                left: 30,
                bottom: 0,
                right: 30,
              }}
            >
              {paperData.map((x, i) => (
                <TouchableOpacity
                  style={[styles.view1]}
                  className="justify-center items-center"
                  onPress={() => {
                    setIsShow(true);
                    setPdfHeading(x.title);
                  }}
                >
                  <View className="h-[80%] my-2 w-[95%] bg-white rounded-[10px] justify-center items-center">
                    <Image
                      key={i}
                      source={{ uri: Books[i].img }}
                      className="h-[100%] w-[100%] rounded-[10px]"
                    />
                  </View>
                  <Text className="text-center">{x.title}</Text>
                  {/* <View className='h-[20%] w-[95%] bg-[#B2A0FF] rounded-[10px] justify-center items-center'><Text className='text-white font-extrabold'>View</Text></View> */}
                  <Modal
                    isVisible={isShow}
                    backdropOpacity={0.2}
                    animationIn="slideInUp"
                  >
                    <View className="h-[80%] bg-white rounded-[10px]">
                      <View className="h-10 bg-[#111441] flex-row rounded-t-[10px] justify-between px-5">
                        <TouchableOpacity
                          className="mt-2"
                          onPress={() => {
                            Linking.openURL(x.link);
                            setIsShow(false);
                          }}
                        >
                          <FontAwesome5 name="download" size={24} color="white" />
                        </TouchableOpacity>
                        <View className="w-[80%] justify-center items-center">
                          <Text className="text-white text-[20px] font-extrabold">
                            {pdfHeading}
                          </Text>
                        </View>
                        <TouchableOpacity
                          className="mt-2"
                          onPress={() => {
                            setIsShow(false);
                          }}
                        >
                          <MaterialCommunityIcons
                            name="close"
                            size={24}
                            color="white"
                          />
                        </TouchableOpacity>
                      </View>
                      <PdfReader
                        withScroll
                        withPinchZoom
                        source={{
                          uri: x.link,
                        }}
                      />
                    </View>
                  </Modal>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[styles.view2]}
                className="justify-center items-center"
              >
                <MaterialCommunityIcons
                  name="arrow-right-circle-outline"
                  size={30}
                  color="#939393"
                />
                <Text className="text-[#939393]">View More</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ScrollView>
      ) : null}

      {isViewMore ? <View /> : null}
    </SafeAreaView>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  view1: {
    marginTop: 1,
    width: width - 300,
    margin: 10,
    height: 140,
    borderRadius: 10,
  },
  view2: {
    marginTop: 1,
    width: width - 310,
    margin: 10,
    height: 140,
    borderRadius: 10,
  },
  view3: {
    marginTop: 8,
    width: width - 260,
    margin: 10,
    height: 80,
    borderRadius: 10,
  },
  view4: {
    marginTop: 8,
    width: width - 50,
    margin: 8,
    height: 60,
    borderRadius: 10,
  },
});
export default Library;
