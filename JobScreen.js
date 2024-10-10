import { Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { ClipboardCheck, ArrowLeft, ArrowRight, Search, PencilLine, CirclePlus, Album } from 'lucide-react';
import { useNavigation } from '@react-navigation/native';

const JobScreen = ({ route }) => {
    const navigation = useNavigation();
    const { userName } = route.params;
    const [jobInput, setJobInput] = useState('');

    const handleFinish = () => {
        console.log('Job added:', jobInput);
        setJobInput('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Hi {userName}</Text>
                    <Text style={styles.subGreeting}>Have a great day ahead</Text>
                </View>
                <ArrowRight />
            </View>
            <Text style={styles.title}>ADD YOUR JOB</Text>
            <Album />
            <TextInput
                style={styles.input}
                placeholder="input your job"
                value={jobInput}
                onChangeText={setJobInput}
            />
            <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
                <Text style={styles.finishButtonText}>FINISH </Text><ArrowLeft />
            </TouchableOpacity>
            <View style={styles.noteContainer}>
                <Text style={styles.note}>The task is to be done...</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    greeting: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    subGreeting: {
        fontSize: 16,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        marginBottom: 20,
    },
    finishButton: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    finishButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    noteContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    note: {
        fontSize: 16,
        color: 'gray',
    },
});
export default JobScreen;