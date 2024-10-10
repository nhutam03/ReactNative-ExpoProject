import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { ClipboardCheck, ArrowLeft, Search, PencilLine, CirclePlus } from 'lucide-react';
import { useNavigation } from '@react-navigation/native';

const InforScreen = ({ route }) => {
    const navigation = useNavigation();
    const { userName } = route.params;
    const [tasks, setTasks] = useState([]);
    const handleGetStarted = () => {
        navigation.navigate('JobScreen', { userName: userName });
    }

    const fetchTasks = async () => {
        try {
            const response = await fetch('https://6707fbff8e86a8d9e42db17a.mockapi.io/api/v1/tasks');
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.taskContainer}>
            <ClipboardCheck color='green' />
            <Text style={styles.completedTask}>{item.name}</Text>
            <TouchableOpacity style={styles.editButton}>
                <PencilLine size={14} color='red' />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft />
                </TouchableOpacity>
                <View>
                    <Text style={styles.greeting}>Hi {userName}</Text>
                    <Text style={styles.subGreeting}>Have a great day ahead</Text>
                </View>
            </View>
            <View style={styles.searchBar}>
                <Search style={styles.icon} />
                <TextInput style={styles.searchArea} placeholder="Search" />
            </View>
            <FlatList
                data={tasks}
                renderItem={renderItem}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.addButton} onPress={handleGetStarted}>
                    <CirclePlus color='white' size={50} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    greeting: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    subGreeting: {
        fontSize: 16,
        marginBottom: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#cac6cf',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    icon: {
        marginRight: 10,
    },
    taskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#d9dbdf',
        marginBottom: 10,
        borderRadius: 20
    },
    completedTask: {
        fontSize: 16,
        color: 'gray',
    },
    editButton: {
        padding: 5,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: '#87ceeb',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        elevation: 2,
    },
});

export default InforScreen;