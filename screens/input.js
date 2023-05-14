import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Input = ({
    label,
    iconName,
    error,
    password,
    onFocus = () => {},
    ...props
}) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(password);
    return ( 
        <View style={{marginBottom: 20}}>
            <Text style={style.label}>{label}</Text>
            <View 
                style={[
                    style.inputContainer, 
                    {
                        borderColor: error 
                        ? 'red'
                        : isFocused 
                        ? 'green'
                        : '#F3F4FB',
                    },
                ]}>
                <Icon 
                    name={iconName} 
                    style={{fontSize: 22, color: 'green', marginRight: 10}} 
                />
                <TextInput 
                    secureTextEntry={hidePassword}
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={()=>{
                        setIsFocused(false);
                    }}
                    style={{color: 'green', flex: 1}} 
                    {...props}
                />
                {password && (
                    <Icon
                    onPress={() => setHidePassword(!hidePassword)}
                    style={{fontSize: 22, color: 'green'}} 
                    name={hidePassword ? 'eye-outline' :'eye-off-outline'} 
                />
                )}
                
            </View>
            {error && (
                <Text style={{color: 'red', fontSize: 12, marginTop: 7}}>
                    {error}
                </Text>
            )}
            
        </View>
    );
};

const style = StyleSheet.create({
    label: {
        marginVertical: 5,
        fontSize: 14,
        color: 'grey',
    },
    inputContainer: {
        height: 55,
        backgroundColor: 'white',
        flexDirection: 'row', 
        paddingHorizontal: 15,
        borderWidth: 0.5,
        alignItems: 'center',
    }
});

export default Input;
