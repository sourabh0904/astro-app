import { View, Text, FlatList, StyleSheet, Button, Pressable, Modal, TextInput, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Image } from 'expo-image';
import { Rating } from 'react-native-ratings';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import ReactNativeModal from 'react-native-modal';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import Slider from '@react-native-community/slider';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import axios from 'axios';
import { api } from '@/config';

type astrologer = {
    id:number,
    name: string,
    expertise: string[],
    languages: string[],
    experience: string,
    rate: string,
    orders: number,
    rating: number,
    profileImage: string;
    discountedRate?: undefined|string,
    description : string,
    totalChatTime: string,
    totalCallTime: string,
}



const listPage = () => {
    
    const [filterModalVisible , setFilterModalVisible] = useState(false);
    
    const [astrologers , setAstrologers ] = useState<astrologer[]>([])
    const [astroList , setAstroList ] = useState<astrologer[]>([])
    
    

    useEffect(()=>{
        
        axios.get(`${api.baseURL}/astrologers`).then((data)=>{
            setAstrologers(data.data)
            setAstroList(data.data)
        }).catch(e=>{
            console.log()
        })
        
    } ,[])



    const applyFilters = useCallback((filters:{expertise:string[] , experience:number})=>{
        setAstroList( astrologers.filter(astro=>{
            return filters.expertise.find(exp => astro.expertise.find(astoexp =>astoexp == exp)) && Number(astro.experience.split(' ')[0]) >= filters.experience
        }))
        setFilterModalVisible(false)
    },[astrologers])

    const search = useCallback((value:string)=>{
        setAstroList(astrologers.filter(astro=>astro.name.toLowerCase().includes(value)));
    },[astroList , astrologers])

  return (
    <View>
        <CustomHeader serach={search} openFilter={()=>setFilterModalVisible(true)} />
        <FilterModal filterModalVisible={filterModalVisible} setFilterModalVisible={setFilterModalVisible} applyFilters={applyFilters} />
      <FlatList
      data={astroList}
      renderItem={AstroCard}
      contentContainerStyle={{paddingBottom:120}}
      />
    </View>
  )
}


const AstroCard = ({index , item}:{index:number , item:astrologer})=>{
    const blurhash =  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    return (
        <Link href={{pathname:'/[id]' , params:{id:item.id , item : JSON.stringify(item)}}} asChild > 
        <Pressable>
        <View style={styles.card}>
            <View style={styles.cardLeft}>
            <Image
                style={styles.profileImage}
                source={item.profileImage}
                contentFit="cover"
                transition={1000}
            />
            <View>

            {item.rating===0?(
                <Text style={{fontWeight:'700' , textAlign:'center' , color:"#bb0101"}}>New!</Text>
            )
            :(<Rating 
            startingValue={item.rating}
            ratingCount={5}
            imageSize={15}
            readonly
            />)}
            <Text style={{textAlign:'center'}}>{Number(item.orders).toLocaleString()} orders</Text>
            </View>
            </View>
            <View style={styles.cardRight}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={{flexDirection:'row'}}>
                    {
                        item.expertise.map((value , index)=>(
                            <Text>{value}{index!==item.expertise.length-1?',':null } </Text>
                        ))
                    }
                </View>
                <View style={{flexDirection:'row'}}>
                    {
                        item.languages.map((value , index)=>(
                            <Text>{value}{index!==item.languages.length-1?',':null } </Text>
                        ))
                    }
                </View>
                <Text>Exp : {item.experience}</Text>

                {
                    item.discountedRate?(
                <View style={{flexDirection:'row'}}>
                    <Text style={{textDecorationLine:'line-through'}}>{item.rate}</Text>
                    <Text style={[styles.rate , {color:"#bb0101"}]}>{item.discountedRate}</Text>
                    </View>
                    ):(
                        <Text style={styles.rate}>{item.rate}</Text>
                    )
                }
            </View>

            <Pressable style={styles.chatButton}>
                <Text style={{color:'green'}}>Chat</Text>
            </Pressable>
        </View>
        </Pressable>
        </Link> 
    )
}


const FilterModal = ({filterModalVisible , setFilterModalVisible ,applyFilters}:{
    filterModalVisible:boolean,
    setFilterModalVisible:(prevalue:any)=>void,
    applyFilters:(filters:{expertise:string[] , experience:number})=>void 
})=>{

    const [expertise , setExpertise] =  useState<string[]>([]);
    const [experience , setExperience] =  useState<number>(0);

    const extpertiseList = [
        {lablel:"Vedic" , value:"Vedic"}, 
        {lablel:"Numerology" , value:"Numerology"}, 
        {lablel:"Vastu" , value:"Vastu"}, 
        {lablel:"Prashana" , value:"Prashana"}, 
        {lablel:"Nadi" , value:"Nadi"}, 
        {lablel:"Tarot" , value:"Tarot"}, 
        {lablel:"Palmistry" , value:"Palmistry"},
    ];
    return (
        <ReactNativeModal isVisible={filterModalVisible} onBackdropPress={()=>setFilterModalVisible(false)}>
            <View style={styles.filterModal}>
                <Text style={[styles.name , {fontSize:22  , marginVertical:5}]}>Filters</Text>
                <View> 
                    <Text style={styles.label}>Expertise</Text>
                    <MultiSelect 
                    data={extpertiseList}
                    labelField={'lablel'}
                    valueField={'value'}
                    value={expertise}
                    onChange={setExpertise}
                    style={{backgroundColor:'#f5f5f5',padding:10 , borderRadius:10}}
                    activeColor='#ffe694'
                    selectedStyle={{borderRadius:10 , backgroundColor:'#fff5d6'}}
                    
                    />
                </View>
                <View> 
                    <Text style={styles.label}>Expreience {experience!==0?`: ${experience}`:null}</Text>
                    <Slider
                    thumbTintColor='#ffc400'
                    minimumTrackTintColor='#ffe07c'
                    minimumValue={0}
                    maximumValue={10}
                    value={experience}
                    onValueChange={(value)=>setExperience(Math.round(value))}
                    />
                </View>
            <Pressable onPress={()=>applyFilters({experience , expertise})} style={{alignSelf:'flex-end' , padding:20}}>
                <Text style={{color:'#eeb600'}}>OK</Text>
            </Pressable>
            </View>
        </ReactNativeModal>
    )
}



const CustomHeader = (props:{openFilter:()=>void ,serach:(value:string)=>void })=>{
    const [enableSearch , setEnableSearch] = useState<boolean>(false);
    const [searchValue , setSearchValue] = useState<string|undefined>(undefined);
    const searchRef = useRef<any>(null);
    const sumbitSearch = useCallback((event :NativeSyntheticEvent<TextInputSubmitEditingEventData>)=>{
        console.log(searchValue);
        props.serach(searchValue?.toLowerCase()||'')
        setSearchValue('')
        setEnableSearch(false);

    },[searchValue])

    useEffect(()=>{
        if( enableSearch) searchRef.current.focus()
    } , [searchRef , enableSearch])

    return (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="menu" color={"black"} size={35} />
          <View style={{ flex: 1, justifyContent: "center" }}>
            {enableSearch ? (
              <Animated.View
                entering={FadeIn.duration(500)}
                exiting={FadeOut.duration(500)}
              >
                <TextInput style={styles.search} ref={searchRef}
                 onSubmitEditing={sumbitSearch} placeholder="Enter Name"
                 value={searchValue}
                 onChangeText={setSearchValue}
                 />
              </Animated.View>
            ) : (<>
              <Text
                style={{ textAlign: "center", fontSize: 20, fontWeight: "700" }}
                ellipsizeMode="tail"
                >
                Chat with Astrologer
              </Text>
                  </>
            )}
          </View>
          <Pressable onPress={()=>setEnableSearch(!enableSearch)}>
            <MaterialCommunityIcons name="magnify" color={"black"} size={35} />
          </Pressable>
          <Pressable onPress={props.openFilter}>
            <MaterialCommunityIcons
              name="filter-outline"
              color={"black"}
              size={35}
            />
          </Pressable>
        </View>
      </View>
    );
}

export default listPage

const styles = StyleSheet.create({
    card :{
        elevation:5,
        borderRadius:5,
        margin:5,
        // flex:1,
        padding:10,
        backgroundColor:"white",
        flexDirection:"row",
        gap:20,
        width:'100%',
    },
    cardLeft:{
        gap:10
    },
    profileImage:{
        width:80 ,
        height:80,
        borderWidth:1,
        borderRadius:40,
        borderColor:"#ffc400"
    },
    cardRight:{
        gap:2

    },
    name:{
        fontSize:18,
        fontWeight:'700',
    },
    rate:{
        fontSize:15,
        fontWeight:'700',
    },
    chatButton:{
        position:'absolute',
        right:20,
        bottom:20,
        paddingHorizontal:20,
        paddingVertical:5,
        borderRadius:10,
        borderColor:'green',
        borderWidth:1,

    },
    headerContainer:{
        height:100,
        backgroundColor:'#ffc400'
    },
    header:{
        flexDirection:'row',
        gap:20,
        position:'absolute',
        bottom:0,
        padding:10
    },
    filterModal:{
        zIndex: 2,
        backgroundColor:'white',
        alignSelf:'center',
        borderRadius:20,
        minWidth:'90%',
        maxWidth:600,
        minHeight:300,
        padding:20,
        gap:15,
    },
    label:{
        fontSize:15,
        marginVertical:5,
    },
    search:{
        backgroundColor:'white',
        padding:5,
        borderRadius:10,
        paddingHorizontal:10,
    }

})