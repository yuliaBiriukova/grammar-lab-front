import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {Level} from "../../models/Level/Level";
import {SliceState} from "../../utils/enums/states/SliceState";
import {getAllLevels} from "../../services/level.service";
import {RootState} from "../../app/store";

const levelsAdapter = createEntityAdapter<Level>({
    selectId: level => level.id,
});

interface LevelsState {
    status: SliceState,
}

const initialState = levelsAdapter.getInitialState<LevelsState>({
    status: SliceState.Idle,
});

export const fetchLevels = createAsyncThunk(
    'levels/fetchLevels',
    async () => {
        return await getAllLevels() ?? [];
    }
);

/*
export const addLevel = createAsyncThunk(
    'levels/addLevel',
    async (newLevel : NewLevel)=> {
        const response = await addLevelAsync(newLevel);
        return  {
            response.data,
            ...newLevel
        }
    }
);

export const editLevel = createAsyncThunk(
    'levels/editLevel',
    async (level: Level)=> {
        await editLevelAsync(level);
        return level;
    }
);

export const deleteLevel = createAsyncThunk(
    'levels/deleteLevel',
    async (id : number)=> {
        await deleteLevelAsync(id);
        return id;
    }
);
*/

const levelsSlice = createSlice({
    name: 'levels',
    initialState,
    reducers: {
        upsertLevel: (state, action) => {
            levelsAdapter.upsertOne(state, action.payload);
        },
        removeLevel: (state, action) => {
            levelsAdapter.removeOne(state, action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchLevels.pending, (state, action) => {
                state.status = SliceState.Loading;
            })
            .addCase(fetchLevels.fulfilled, (state, action) => {
                levelsAdapter.setAll(state, action.payload);
                state.status = SliceState.Succeeded;
            })
            .addCase(fetchLevels.rejected, (state, action) => {
                state.status = SliceState.Failed;
            });
    }
});

export default levelsSlice.reducer;

export const { upsertLevel, removeLevel } = levelsSlice.actions;

export const {
    selectIds: selectLevelsIds,
    selectById: selectLevelById,
    selectAll: selectLevels,
} = levelsAdapter.getSelectors<RootState>(state => state.levels);