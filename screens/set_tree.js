import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { auth } from '../fireBaseConfig';
import { db } from '../fireBaseConfig'
import { doc, getDocs, updateDoc, setDoc, collection, query, where } from "firebase/firestore"

export default function TreeSet() {
    const [tree_name, onChangeTree_name] = React.useState('')
    const [quantity, onChangeQuantity] = React.useState('')

    const user = auth.currentUser;
    const email = user.email;

    const [fruits, setFruits] = React.useState([])

    React.useEffect(() => {
        ; (async () => {
            const colRef = query(collection(db, 'fruit'), where("user_email", "==", email))
            const doc_snap = await getDocs(colRef)
            const docs = doc_snap.docs.map((doc) => {
              const data = doc.data()
              return data
            })

            setFruits(docs)
            console.log("hello")
        })()
    }, [])

    console.log(fruits)
    

    function find_update(tree_name, quantity) {
        if (fruits.length != 0) {
            for (i = 0; i < fruits.length; i++) {
                if (fruits[i].tree_name == tree_name) {
                    const minRef = doc(db, 'fruit', email + tree_name)
                    updateDoc(minRef, {
                        quantity: quantity
                    })
                    alert("Successfully!")
                    return
                }
            }
        }

        setDoc(doc(db, "fruit", email + tree_name), {
            tree_name: tree_name,
            quantity: quantity,
            user_email: email
        })
        change_tree = true
        alert("Successfully!")
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.label}>
                <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>Name of tree</Text>
                <TextInput 
                    style={styles.input} 
                    onChangeText={onChangeTree_name}
                    value={tree_name}
                    placeholder="Enter a name" 
                />
                <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold', marginTop: 10}}>Quantity</Text>
                <TextInput 
                    keyboardType="numeric" 
                    style={styles.input} 
                    onChangeText={onChangeQuantity}
                    value={quantity}
                    placeholder="Enter a number" 
                />
                <View style={styles.SaveBtnWrapper}>
                    <LinearGradient
                        colors={['#13552c', '#729642']}
                        style={styles.linearGradient}
                        start={{y: 0.0, x: 0.0}}
                        end={{y: 1.0, x: 0.0}}>
                        <TouchableOpacity
                            onPress={() => find_update(tree_name.toLowerCase(), quantity)}
                            activeOpacity={0.7}
                            style={styles.SaveBtn}>
                            <Text style={styles.SaveText}>Save changes</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
container: {
    backgroundColor: '#e6eee7',
    padding: 20,
    width: '100%',
    position: 'relative',
    flex: 1,
},
label: {
    marginTop: 20,
},
input: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    paddingVertical: 0,
    backgroundColor: 'white',
},
SaveBtnWrapper: {
    height: 55,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    padding: 25,
},
linearGradient: {
    width: '100%',
    borderRadius: 50,
},
SaveBtn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
},
SaveText: {
    color: 'white',
    fontSize: 20,
},
});