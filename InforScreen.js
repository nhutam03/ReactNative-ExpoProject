import { Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { ClipboardCheck, ArrowLeft, Search, PencilLine, CirclePlus } from 'lucide-react'
import { useNavigation } from '@react-navigation/native';

const InforScreen = () => {
    const navigation = useNavigation();
    const tasks = [
        { id: '1', title: 'To check email' },
        { id: '2', title: 'UI task web page' },
        { id: '3', title: 'Learn javascript basic' },
        { id: '4', title: 'Learn HTML Advance' },
        { id: '5', title: 'Medical App U' },
        { id: '6', title: 'Learn Java' },
    ];
    const renderItem = ({ item }) => (
        <View style={styles.taskContainer}>
            <ClipboardCheck color='green' />
            <Text style={styles.completedTask}>{item.title}</Text>
            <TouchableOpacity style={styles.editButton}>
                <PencilLine size={14} color='red' />
            </TouchableOpacity>
        </View>
    );
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ArrowLeft />
                <View>
                    <Text style={styles.greeting}>Hi Twinkle</Text>
                    <Text style={styles.subGreeting}>Have a great day ahead</Text>
                </View>
            </View>

            <View style={styles.searchBar}>
                <Search />
                <TextInput style={styles.searchArea} placeholder="Search" />
            </View>

            <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity style={styles.addButton}
                onPress={() => navigation.navigate('JobScreen')}
            >
                <CirclePlus size={50} color='blue' />
            </TouchableOpacity>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 20,
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
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#cac6cf',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    searchArea: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    taskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#cccacf',
        borderRadius: 20,
        marginBottom: 10,
        padding: 10,
    },
    completedTask: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    editButton: {
        padding: 5,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
    },
    addButton: {
        marginTop: 20,
        padding: 10,
        borderRadius: 100,
        width: 70,
        height: 130,
        alignItems: 'center',
    },
})
export default InforScreen;