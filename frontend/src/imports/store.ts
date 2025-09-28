/**
 * Centralized Redux imports.
 */

export { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
export { useSelector, useDispatch } from "react-redux";

// Example slice re-export
export * from "../slices/threadsSlice";
export * from "../slices/uiSlice";
