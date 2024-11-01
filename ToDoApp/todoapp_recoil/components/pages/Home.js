import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList, Modal } from 'react-native';
import { ClipboardCheck, ArrowLeft, Search, PencilLine, CirclePlus } from 'lucide-react';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { jobsState, fetchJobsSelector, addJobSelector, editJobSelector, jobsLoadingState } from '../../state/jobState';

const Home = ({ route }) => {
  const navigation = useNavigation();
  const { userName } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const [jobs, setJobs] = useRecoilState(jobsState);
  const fetchedJobs = useRecoilValue(fetchJobsSelector);
  const setLoading = useSetRecoilState(jobsLoadingState);
  const setAddJob = useSetRecoilState(addJobSelector);
  const setEditJob = useSetRecoilState(editJobSelector);

  // Sử dụng dữ liệu đã được fetch từ `fetchJobsSelector`
  useEffect(() => {
    setJobs(fetchedJobs);
    setLoading(false);
  }, [fetchedJobs, setJobs, setLoading]);

  const handleEdit = (id, currentTitle) => {
    setEditId(id);
    setEditTitle(currentTitle);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setEditJob(editId)(editTitle);
    setIsEditing(false);
    setEditId(null);
    setEditTitle('');
  };

  const handleAddJob = () => {
    setAddJob("New Job Title"); // Thêm công việc mới
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <ClipboardCheck color="green" />
      <Text style={styles.completedTask}>{item.title}</Text>
      <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item.id, item.title)}>
        <PencilLine size={14} color="red" />
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
        <TextInput 
          placeholder="Search" 
          value={searchQuery} 
          onChangeText={setSearchQuery} 
        />
      </View>
      <FlatList
        data={jobs.filter(job => job.title.includes(searchQuery))}
        renderItem={renderItem}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddJob}>
          <CirclePlus color="white" size={50} />
        </TouchableOpacity>
      </View>

      <Modal visible={isEditing} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Job Title</Text>
            <TextInput
              style={styles.modalInput}
              value={editTitle}
              onChangeText={setEditTitle}
            />
            <TouchableOpacity onPress={handleSaveEdit} style={{backgroundColor:'blue', width: 50, justifyContent:'center'}}><Text>Save</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setIsEditing(false)} style={{backgroundColor:'red', width: 50, justifyContent:'center'}}><Text>Cancel</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default Home;
