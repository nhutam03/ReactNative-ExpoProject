import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { ArrowLeft, ArrowRight, Album } from 'lucide-react';
import { useNavigation } from '@react-navigation/native';

const JobScreen = ({ route }) => {
    const navigation = useNavigation();
    const { userName } = route.params;
    const { task } = useState();
    const [jobInput, setJobInput] = useState('');

    const handleFinish = () => {
        console.log('Job added:', jobInput);
        setJobInput('');
    };

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
                    <Album />
                    <TextInput
                        style={styles.jobInput}
                        placeholder="Enter your job"
                        placeholderTextColor="#bfbfbf"
                        value={task}
                        onChangeText={setJobInput} />
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
                    <Text style={styles.finishButtonText}>FINISH </Text>
                    <ArrowRight color='white' />
                </TouchableOpacity>
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
        marginBottom: 20
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
        padding: 10,
        backgroundColor: '#87ceeb',
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    finishButtonText: {
        color: '#fff',
        fontSize: 16,
        marginRight: 5,
    },
    image: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginTop: 40
    },
    footer: {
        flex: 2,
        flexDirection: 'column',
        marginBottom: 20
    }
});
export default JobScreen;