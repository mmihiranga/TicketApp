import React, { useState ,useEffect,useRef} from "react";
import Modal from 'react-native-modalbox';
import Money from '../../assets/Image/recharge.png'
import {
    Text,
    Button,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    Image,
    View,
    Dimensions,
    TextInput
  } from 'react-native';

  const {width , height} = Dimensions.get("window")

const RechargeModal =()=>{
  const show = useRef();

  return (
    <View style={styles.mainModalView}>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => show.current.open()}>
        <View style={styles.RechargeBtnContainer}>
          <Image style={styles.RechargeBtnImage} source={Money} />
          <Text style={styles.RechargeBtnText}>Recharge</Text>
        </View>
      </TouchableHighlight>
      <View style={styles.wrapper}>
        <Modal
          style={styles.modal}
          position={'bottom'}
          ref={show}
          swipeToClose={true}
          swipeArea={0}
          backdrop={true}>
          <Text style={styles.text}>Modal on bottom with backdrop</Text>
        </Modal>
      </View>
    </View>
  );
}

export default RechargeModal;

const styles = StyleSheet.create({
    mainModalView:{
        width:width,
        height:height,
        position:"absolute",
      
    },

    wrapper: {
      paddingTop: 50,
      height:height-100,
     
    },
  
    modal: {
        width:width,
            height:600,
            backgroundColor: "#FFFEFE",
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            padding: 10,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0,  height: 2   },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5, 
            zIndex: 2,
          
    },
  
    
  
    btn: {
      margin: 10,
      backgroundColor: "#3B5998",
      color: "white",
      padding: 10
    },
  
    btnModal: {
      position: "absolute",
      top: 0,
      right: 0,
      width: 50,
      height: 50,
      backgroundColor: "transparent"
    },
  
    text: {
      color: "black",
      fontSize: 22
    },
    RechargeBtnContainer:{
        width:170,
        height:85,
        borderRadius:10,
        margin:5,
        backgroundColor:"#f5f9ff",
        borderColor:'#f5f9ff', 
        borderWidth:1,
        overflow: 'hidden',
        shadowColor: "black",
        shadowRadius: 10,
        flexDirection:"row",
        justifyContent:"center",
        alignItems: 'center',
        shadowOffset: {width : 0.5,height:0.5},
        shadowOpacity:0.5,
        elevation: 5,
        
    },
    RechargeBtnText:{
        color:"#F6F6F9",
        fontFamily: 'Raleway-Bold',
        fontSize:17,
        textAlign: 'center',
        paddingLeft:6,
        color:"#000",
        
    },
    RechargeBtnIcon:{
        fontSize:33,
        color:"#2870fc",
     },
     RechargeBtnImage:{
         width:45,
         height:50,
         
     },
  
  });