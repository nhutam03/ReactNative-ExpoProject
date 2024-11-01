import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList, Modal } from 'react-native';
import { ClipboardCheck, ArrowLeft, Search, PencilLine, CirclePlus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { jobListState, deleteJob, editJobSelector } from '../../state/jobsState';

const RenderItem = ({ job, handleEdit }) => (
  <View style={styles.taskContainer}>
    <ClipboardCheck color="green" />
    <Text style={styles.completedTask}>{job.title}</Text>
    <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(job.id, job.title)}>
      <PencilLine size={14} color="red" />
    </TouchableOpacity>
  </View>
);
export default function Home({ route, navigation }) {
  const { userName } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  
  const jobs = useRecoilValue(jobListState);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (id, currentTitle) => {
    setEditId(id);
    setEditTitle(currentTitle);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const setEditJob = useSetRecoilState(editJobSelector(editId));
    setEditJob(editTitle); // gọi selector với editId và editTitle
    setIsEditing(false);
    setEditId(null);
    setEditTitle('');
  };

  const handleAddJob = () => {
    navigation.navigate('AddJob', { userName });
  };

 

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
      {/* <FlatList
        data={jobs.filter(job => job.title.includes(searchQuery))}
        renderItem={renderItem}
      /> */}
      <FlatList
        data={filteredJobs}
        renderItem={({ item }) => <renderItem job={item} handleEdit={handleEdit} />}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
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
            <TouchableOpacity onPress={handleSaveEdit} style={{ backgroundColor: 'blue', width: 50, justifyContent: 'center' }}><Text>Save</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setIsEditing(false)} style={{ backgroundColor: 'red', width: 50, justifyContent: 'center' }}><Text>Cancel</Text></TouchableOpacity>
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
