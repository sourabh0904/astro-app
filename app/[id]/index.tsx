import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Image } from 'expo-image'
import { Rating } from 'react-native-ratings'
import { MaterialCommunityIcons } from '@expo/vector-icons'

type astrologer = {
    id:number,
    name: string,
    expertise: string[],
    languages: string[],
    experience: string,
    rate: string,
    orders: string,
    rating: number,
    profileImage: string;
    discountedRate?: undefined,
    description : string,
    totalChatTime: string,
    totalCallTime: string,
}

const AstroPage = () => {
    const {id ,item} = useLocalSearchParams()
    let astrologer:astrologer;
    if (typeof item === 'string' ) astrologer = JSON.parse(item)
    else astrologer="";

    const naviagtion = useNavigation();

    useEffect(()=>{
        naviagtion.setOptions({
            headerTitle:astrologer.name,
            headerStyle: {
                backgroundColor: '#ffc400',
              },
      
        })
    },[astrologer])


  return (
    <View style={{flex:1}}>
      <View style={styles.cardContainter}>
        <View style={styles.card}>
            <View style={styles.cardLeft}>
            <Image
                style={styles.profileImage}
                source={astrologer.profileImage}
                contentFit="cover"
                transition={1000}
            />
            <View>

            {astrologer.rating===0?(
                <Text style={{fontWeight:'700' , textAlign:'center' , color:"#bb0101"}}>New!</Text>
            )
            :(<Rating 
            startingValue={astrologer.rating}
            ratingCount={5}
            imageSize={15}
            readonly
            />)}
            <Text style={{textAlign:'center'}}>{Number(astrologer.orders).toLocaleString()} orders</Text>
            </View>
            </View>
            <View style={styles.cardRight}>
                <Text style={styles.name}>{astrologer.name}</Text>
                <View style={{flexDirection:'row'}}>
                    {
                        astrologer.expertise.map((value , index)=>(
                            <Text>{value}{index!==astrologer.expertise.length-1?',':null } </Text>
                        ))
                    }
                </View>
                <View style={{flexDirection:'row'}}>
                    {
                        astrologer.languages.map((value , index)=>(
                            <Text>{value}{index!==astrologer.languages.length-1?',':null } </Text>
                        ))
                    }
                </View>
                <Text>Exp : {astrologer.experience}</Text>

                {
                    astrologer.discountedRate?(
                <View style={{flexDirection:'row'}}>
                    <Text style={{textDecorationLine:'line-through'}}>{astrologer.rate}</Text>
                    <Text style={[styles.rate , {color:"#bb0101"}]}>{astrologer.discountedRate}</Text>
                    </View>
                    ):(
                        <Text style={styles.rate}>{astrologer.rate}</Text>
                    )
                }
            </View>
            </View>
            <View style={{borderWidth:0.5 , borderColor:'#525252' }}></View>
            <View style={{flexDirection:'row' , justifyContent:'space-evenly' , alignItems:'center'}}>
                <View style={{flexDirection:'row' , alignItems:'center' , gap:10}}>
                    <MaterialCommunityIcons name='android-messages' size={25}/>
                    <Text style={{fontSize:15}}>{astrologer.totalChatTime}</Text>
                </View>
            <View style={{borderWidth:0.8 , borderColor:'#525252' , height:30 }}></View>
                <View style={{flexDirection:'row' , alignItems:'center' , gap:10}}>
                    <MaterialCommunityIcons name='phone' size={25}/>
                    <Text style={{fontSize:15}}>{astrologer.totalCallTime}</Text>
                </View>
            </View>
        </View>
        <View style={[styles.cardContainter , {padding:15}]}>
                <Text style={{fontSize:16}}>
                    {astrologer.description}
                </Text>
        </View>
    </View>
  )
}

export default AstroPage

const styles = StyleSheet.create({
    card :{
        // flex:1,
        padding:10,
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
    cardContainter:{
        elevation:5,
        borderRadius:20,
        margin:5,
        // flex:1,
        padding:10,
        backgroundColor:"white",
        gap:10,
        // width:'100%',
    }
})