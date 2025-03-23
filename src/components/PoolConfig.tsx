import React from 'react';
import { Trash2, Plus, RotateCcw, GripVertical } from 'lucide-react';
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PoolConfig as PoolConfigType } from '../types';
import { DEFAULT_POOLS } from '../constants';

interface PoolItemProps {
  pool: PoolConfigType;
  index: number;
  onUpdate: (index: number, field: keyof PoolConfigType, value: string | number) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

const SortablePoolItem: React.FC<PoolItemProps> = ({ pool, index, onUpdate, onRemove, canRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: index.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className={`flex gap-4 items-center ${isDragging ? 'opacity-50' : ''}`}
    >
      <button
        className="cursor-grab active:cursor-grabbing p-2 text-theme-500 hover:text-theme-700 dark:text-theme-400 dark:hover:text-theme-200"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={20} />
      </button>
      <input
        type="text"
        value={pool.characters}
        onChange={(e) => onUpdate(index, 'characters', e.target.value)}
        className="flex-1 p-2 border rounded-md dark:bg-theme-800 dark:border-theme-700 focus:ring-2 focus:ring-accent dark:focus:ring-accent/70"
        placeholder="Enter characters..."
      />
      <input
        type="number"
        value={pool.count}
        onChange={(e) => onUpdate(index, 'count', parseInt(e.target.value) || 0)}
        min="0"
        className="w-20 p-2 border rounded-md dark:bg-theme-800 dark:border-theme-700 focus:ring-2 focus:ring-accent dark:focus:ring-accent/70"
      />
      {canRemove && (
        <button
          onClick={() => onRemove(index)}
          className="p-2 text-red-500 hover:text-red-600"
        >
          <Trash2 size={20} />
        </button>
      )}
    </div>
  );
};

interface PoolConfigProps {
  pools: PoolConfigType[];
  onChange: (pools: PoolConfigType[]) => void;
}

export const PoolConfig: React.FC<PoolConfigProps> = ({ pools, onChange }) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const addPool = () => {
    onChange([...pools, { characters: '', count: 1 }]);
  };

  const removePool = (index: number) => {
    if (pools.length > 1) {
      onChange(pools.filter((_, i) => i !== index));
    }
  };

  const updatePool = (index: number, field: keyof PoolConfigType, value: string | number) => {
    const newPools = [...pools];
    newPools[index] = { ...newPools[index], [field]: value };
    onChange(newPools);
  };

  const resetToDefault = () => {
    onChange(DEFAULT_POOLS);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = parseInt(active.id.toString());
      const newIndex = parseInt(over.id.toString());
      
      const newPools = [...pools];
      const [movedPool] = newPools.splice(oldIndex, 1);
      newPools.splice(newIndex, 0, movedPool);
      
      onChange(newPools);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Character Pools</h2>
        <div className="flex gap-2">
          <button
            onClick={resetToDefault}
            className="flex items-center gap-2 px-4 py-2 bg-theme-600 text-white rounded-md hover:bg-theme-700 focus:ring-2 focus:ring-accent/50"
            title="Reset to default pools"
          >
            <RotateCcw size={16} />
            Reset
          </button>
          <button
            onClick={addPool}
            className="flex items-center gap-2 px-4 py-2 bg-theme text-white rounded-md hover:bg-theme-600 focus:ring-2 focus:ring-accent/50"
          >
            <Plus size={16} />
            Add Pool
          </button>
        </div>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={pools.map((_, i) => i.toString())} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {pools.map((pool, index) => (
              <SortablePoolItem
                key={index}
                pool={pool}
                index={index}
                onUpdate={updatePool}
                onRemove={removePool}
                canRemove={pools.length > 1}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}