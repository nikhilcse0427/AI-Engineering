import { getWithAuth, postWithAuth, putWithAuth } from "@/components/ui/service/httpService";
import { create } from "zustand";

export const useAppointmentStore = create((set, get) => ({
  appointments: [],
  bookedSlots: [],
  currentAppointment: null,
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  setCurrentAppointment: (appointment) =>
    set({ currentAppointment: appointment }),

  fetchAppointments: async (role, tab = "", filters = {}) => {
    set({ loading: true, error: null });
    try {
      const endPoint =
        role === "doctor" ? "/appointment/doctor" : "/appointment/patient";
      const queryParams = new URLSearchParams();
      if (tab === "upcoming") {
        queryParams.append("status", "Scheduled");
        queryParams.append("status", "In Progress");
      } else if (tab === "past") {
        queryParams.append("status", "Completed");
        queryParams.append("status", "Cancelled");
      }

      Object.entries(filters).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== "" &&
          key !== "status"
        ) {
          if (Array.isArray(value)) {
            value.forEach((v) => queryParams.append(key, v.toString()));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });
      const response = await getWithAuth(
        `${endPoint}?${queryParams.toString()}`,
      );
      set({ appointments: response.data || [] });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false, error: null });
    }
  },

  fetchAppointmentById: async (appointmentId) => {
    set({ loading: true, error: null });
    try {
      const response = await getWithAuth(`/appointment/${appointmentId}`);
      set({ currentAppointment: response?.data?.appointment });
      return response?.data?.appointment;
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false, error: null });
    }
  },

  fetchBookedSlots: async (doctorId, date) => {
    set({ loading: true, error: null });
    try {
      const response = await getWithAuth(
        `/appointment/booked-slots/${doctorId}/${date}`,
      );
      set({ bookedSlots: response?.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false, error: null });
    }
  },

  bookAppointment: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await postWithAuth("/appointment/book", data);
      set((state) => ({
        appointments: [response.data, ...state.appointments],
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false, error: null });
    }
  },

  joinConsultation: async (appointmentId) => {
    set({ loading: true, error: null });
    try {
      const response = await getWithAuth(`/appointment/join/${appointmentId}`);
      set((state) => ({
        appointments: state.appointments.map((apt) =>
          apt._id === appointmentId ? { ...apt, staus: "In Progress" } : apt,
        ),
        currentAppointment:
          state.currentAppointment?._id === appointmentId
            ? { ...state.currentAppointment, status: "In Progress" }
            : state.currentAppointment,
      }));

      return response.data;
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false, error: null });
    }
  },
  endConsultation: async (appointmentId, prescription, notes) => {
    set({ loading: true, error: null });
    try {
      const response = await putWithAuth(`/appointment/end/${appointmentId}`, {
        prescription,
        notes,
      });
      set((state) => ({
        appointments: state.appointments.map((apt) =>
          apt._id === appointmentId ? { ...apt, staus: "Completed" } : apt,
        ),
        currentAppointment:
          state.currentAppointment?._id === appointmentId
            ? { ...state.currentAppointment, status: "Completed" }
            : state.currentAppointment,
      }));

      return response.data;
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false, error: null });
    }
  },
  updateAppointmentStatus: async (appointmentId, status) => {
    set({ loading: true, error: null });
    try {
      const response = await putWithAuth(
        `/appointment/status/${appointmentId}`,
        { status },
      );
      set((state) => ({
        appointments: state.appointments.map((apt) =>
          apt._id === appointmentId ? { ...apt, staus: status } : apt,
        ),
        currentAppointment:
          state.currentAppointment?._id === appointmentId
            ? { ...state.currentAppointment, status: status }
            : state.currentAppointment,
      }));

      return response.data;
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false, error: null });
    }
  },
}));
