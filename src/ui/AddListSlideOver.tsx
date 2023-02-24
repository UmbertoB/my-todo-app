import { FC, useContext, useState } from 'react';
import { GenericEvent, InputChangeEventHandler } from '@/types/events';
import { TodoList } from '@/types/main';
import mongoObjectId from '@/lib/generateUniqueId';
import { TodoListsContext } from '@/state/todo-lists/TodoListsProvider';
import { Input } from '@/components/Input';
import { ColorPicker } from '@/components/ColorPicker';

const styles = {
  inputField:
    'form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
};

interface AddListSlideOver {
  setOpen: (open: boolean) => void;
}

const AddListModal: FC<AddListSlideOver> = ({ setOpen }) => {
  const [listTitle, setListTitle] = useState('');
  const { handleAddTodoList } = useContext(TodoListsContext);

  const handleInputChange = (e: GenericEvent) => {
    const { value } = e.target;
    setListTitle(value);
  };
  const handleSubmit = async (e: GenericEvent) => {
    e.preventDefault();
    if (listTitle.length > 0) {
      const newList: TodoList = { _id: mongoObjectId(), title: listTitle, dateAdded: new Date() };
      handleAddTodoList(newList);
      setOpen(false);
    }
  };

  return (
    <form id="addData-form" onSubmit={handleSubmit}>
      <div className="form-group mb-6">
        <Input value={listTitle} onChange={handleInputChange} label={<>Nome da Lista</>} />
        <ColorPicker />
      </div>
      <button
        type="submit"
        className="
    px-6
    py-2.5
    bg-blue-600
    text-white
    font-medium
    text-xs
    leading-tight
    uppercase
    rounded
    shadow-md
    hover:bg-blue-700 hover:shadow-lg
    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
    active:bg-blue-800 active:shadow-lg
    transition
    duration-150
    ease-in-out">
        Submit
      </button>
    </form>
  );
};

export default AddListModal;
