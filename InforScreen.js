import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { ClipboardCheck, ArrowLeft, Search, PencilLine, CirclePlus } from 'lucide-react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const InforScreen = ({ route }) => {
    const navigation = useNavigation();
    const { userName } = route.params;
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editTask, setEditTask] = useState(null);
    const [APIData, setAPIData] = useState();

    const handleGetStarted = () => {
        navigation.navigate('JobScreen', { userName: userName });
    }

    const addTask = async () => {
        if (newTask.trim()) {
            try {
                const response = await axios.post('https://6707fbff8e86a8d9e42db17a.mockapi.io/api/v1/tasks', { title: newTask });
                setTasks([...tasks, response.data]);
                setNewTask("");
            } catch (error) {
                console.error(error);
            }
        }
    }

    const editSelectedTask = (task) => {
        setEditTask(task);
        setNewTask(task.title);
    }
    const updateTask = async () => {
        if (editTask) {
            try {
                const response = await axios.put('https://6707fbff8e86a8d9e42db17a.mockapi.io/api/v1/tasks/${editTask.id}', { nane: newTask });
                setTasks(tasks.map(task.id == editTask.id ? response.data : task));
                setEditTask(null);
                setNewTask("");
            } catch (error) {
                console.error(error);
            }
        }
    }
    const deleteTask = async (id) => {
        try {
            await axios.delete('https://6707fbff8e86a8d9e42db17a.mockapi.io/api/v1/tasks/${id}');
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error(error);
        }
    }
    // const setData = (data) => {
    //   let { id, title } = data;
    //   localStorage.setItem('ID', id);
    //   localStorage.setItem('Title', title);
    //}

    // const onDelete = (id) => {
    //   axios.delete(`https://6707fbff8e86a8d9e42db17a.mockapi.io/api/v1/tasks/${id}`)
    //   .then(() => {
    //     getData();
    //   })
    // }

    const getData = () => {
        axios.get('https://6707fbff8e86a8d9e42db17a.mockapi.io/api/v1/tasks')
            .then((getData) => {
                setAPIData(getData.data);
            })
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
    // const handleEidt = () => {
    //   getData();

    // }

    useFocusEffect(
        useCallback(() => {
            fetchTasks();
        }, [])
    );
    useEffect(() => {
        fetchTasks();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.taskContainer}>
            <ClipboardCheck color='green'></ClipboardCheck>
            <Text style={styles.completedTask}>{item.title}</Text>
            <TouchableOpacity style={styles.editButton}>
                <PencilLine size={14} color='red'></PencilLine>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft></ArrowLeft>
                </TouchableOpacity>
                <View>
                    <Text style={styles.greeting}>Hi {userName}</Text>
                    <Text style={styles.subGreeting}>Have a great day ahead</Text>
                </View>
            </View>
            <View style={styles.searchBar}>
                <Search style={styles.icon} />
                <TextInput placeholder="Search" />
            </View>
            <FlatList
                data={tasks}
                renderItem={renderItem}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.addButton} onPress={handleGetStarted}>
                    <CirclePlus color='white' size={50}></CirclePlus>
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