import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { ArrowLeft, ArrowRight, Album } from 'lucide-react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const JobScreen = ({ route }) => {
    const navigation = useNavigation();
    const { userName } = route.params;
    const [title, setJob] = useState('');

    //them data vao api
    const postData = () => {
        axios.post('https://6707fbff8e86a8d9e42db17a.mockapi.io/api/v1/tasks', {
            title,
        }).then(() => {
            navigation.navigate('InforScreen', { userName: userName });
        })
            .catch(error => {
                console.error('Error adding job:', error);
            });
    }
    const handleFinish = () => {
        console.log("Job added: " + title);
        postData();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View >
                    <Text style={styles.greeting}>Hi {userName}</Text>
                    <Text style={styles.subGreeting}>Have a great day ahead</Text>
                </View>
                <TouchableOpacity onPress={() => { navigation.goBack() }}><ArrowLeft /></TouchableOpacity>
            </View>
            <View style={styles.titleArea}>
                <Text style={styles.title}>ADD YOUR JOB</Text>
            </View>
            <View style={styles.view}>
                <View style={styles.inputArea}>
                    <Album color='green' />
                    <TextInput
                        style={styles.jobInput}
                        placeholder="Enter your job"
                        placeholderTextColor="#bfbfbf"
                        value={title}
                        onChangeText={setJob} />
                </View>
            </View>
            <View style={styles.footer}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around'
                }}>
                    <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
                        <Text style={styles.finishButtonText}>FINISH </Text>
                        <ArrowRight color='white' />
                    </TouchableOpacity>
                </View>
                <Image source={require('./img/image.png')} style={styles.image} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    header: {
        justifyContent: 'space-between',
        marginBottom: 10,
        flexDirection: 'row',
    },
    greeting: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    subGreeting: {
        fontSize: 16,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    titleArea: {
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputArea: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#cac6cf',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 400,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    jobInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#000',
    },
    finishButton: {
        fontWeight: 'bold',
        backgroundColor: '#87ceeb',
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 50,
        borderRadius: 20,
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    finishButtonText: {
        color: '#fff',
        fontSize: 16,
        marginRight: 5,
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 40
    },
    footer: {
        flex: 2,
        flexDirection: 'column',
        marginBottom: 20,
        justifyContent: 'center',
        alignContent: 'center'
    }
});
export default JobScreen;