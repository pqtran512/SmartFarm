import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
const Button = ({title, onPress = () => {}}) => {
    return (
        <LinearGradient
            colors={['#13552c', '#729642']}
            start={{y: 0.0, x: 0.0}}
            end={{y: 1.0, x: 0.0}}
            style={{
                height: 55, 
                width: '100%', 
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
                borderRadius: 50,
            }}>
            <TouchableOpacity 
                activeOpacity={0.7}
                onPress={onPress}>
                <Text style={{color: 'white', fontSize: 18}}>{title}</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

export default Button;