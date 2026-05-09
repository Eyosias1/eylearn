export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      calendar_events: {
        Row: {
          created_at: string | null
          duration_minutes: number
          external_id: string | null
          id: string
          scheduled_date: string
          source: string
          start_time: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          duration_minutes: number
          external_id?: string | null
          id?: string
          scheduled_date: string
          source?: string
          start_time: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          duration_minutes?: number
          external_id?: string | null
          id?: string
          scheduled_date?: string
          source?: string
          start_time?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      note_folders: {
        Row: {
          created_at: string
          emoji: string | null
          id: string
          name: string
          parent_id: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          emoji?: string | null
          id?: string
          name: string
          parent_id?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          emoji?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "note_folders_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "note_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      note_references: {
        Row: {
          source_note_id: string
          target_note_id: string
        }
        Insert: {
          source_note_id: string
          target_note_id: string
        }
        Update: {
          source_note_id?: string
          target_note_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "note_references_source_note_id_fkey"
            columns: ["source_note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_references_target_note_id_fkey"
            columns: ["target_note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          content: string
          created_at: string | null
          date: string
          difficulty: string
          emoji: string | null
          folder_id: string | null
          id: string
          path: string | null
          rendered_at: string | null
          rendered_html: string | null
          slug: string
          status: string
          subject: string
          subject_slug: string | null
          tags: string[] | null
          title: string
          topic: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content?: string
          created_at?: string | null
          date: string
          difficulty: string
          emoji?: string | null
          folder_id?: string | null
          id?: string
          path?: string | null
          rendered_at?: string | null
          rendered_html?: string | null
          slug: string
          status: string
          subject: string
          subject_slug?: string | null
          tags?: string[] | null
          title: string
          topic: string
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          content?: string
          created_at?: string | null
          date?: string
          difficulty?: string
          emoji?: string | null
          folder_id?: string | null
          id?: string
          path?: string | null
          rendered_at?: string | null
          rendered_html?: string | null
          slug?: string
          status?: string
          subject?: string
          subject_slug?: string | null
          tags?: string[] | null
          title?: string
          topic?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notes_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "note_folders"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          marketing: string
          product_updates: string
          role: string
          updated_at: string
          username: string | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          marketing?: string
          product_updates?: string
          role?: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          marketing?: string
          product_updates?: string
          role?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      question_sets: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          subject_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          subject_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          subject_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_sets_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          body: string
          correct_answer: string
          created_at: string | null
          id: string
          image_url: string | null
          options: Json | null
          position: number | null
          set_id: string | null
          subtopic_id: string | null
          topic_id: string
          type: string
          user_id: string
        }
        Insert: {
          body: string
          correct_answer: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          options?: Json | null
          position?: number | null
          set_id?: string | null
          subtopic_id?: string | null
          topic_id: string
          type: string
          user_id: string
        }
        Update: {
          body?: string
          correct_answer?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          options?: Json | null
          position?: number | null
          set_id?: string | null
          subtopic_id?: string | null
          topic_id?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "question_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_subtopic_id_fkey"
            columns: ["subtopic_id"]
            isOneToOne: false
            referencedRelation: "subtopics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      review_sessions: {
        Row: {
          actual_duration_minutes: number | null
          ai_verified_score: number | null
          date: string
          id: string
          mode: string
          overall_rating: string | null
          round1_avg_confidence: number | null
          round1_score: number | null
          round2_score: number | null
          scheduled_duration_minutes: number
          started_at: string
          subtopic_id: string
          user_id: string
        }
        Insert: {
          actual_duration_minutes?: number | null
          ai_verified_score?: number | null
          date: string
          id?: string
          mode: string
          overall_rating?: string | null
          round1_avg_confidence?: number | null
          round1_score?: number | null
          round2_score?: number | null
          scheduled_duration_minutes: number
          started_at?: string
          subtopic_id: string
          user_id: string
        }
        Update: {
          actual_duration_minutes?: number | null
          ai_verified_score?: number | null
          date?: string
          id?: string
          mode?: string
          overall_rating?: string | null
          round1_avg_confidence?: number | null
          round1_score?: number | null
          round2_score?: number | null
          scheduled_duration_minutes?: number
          started_at?: string
          subtopic_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_sessions_subtopic_id_fkey"
            columns: ["subtopic_id"]
            isOneToOne: false
            referencedRelation: "subtopics"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduled_study: {
        Row: {
          created_at: string | null
          duration_minutes: number
          id: string
          scheduled_date: string
          start_time: string
          subtopic_id: string | null
          title: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          duration_minutes?: number
          id?: string
          scheduled_date: string
          start_time: string
          subtopic_id?: string | null
          title?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          duration_minutes?: number
          id?: string
          scheduled_date?: string
          start_time?: string
          subtopic_id?: string | null
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_study_subtopic_id_fkey"
            columns: ["subtopic_id"]
            isOneToOne: false
            referencedRelation: "subtopics"
            referencedColumns: ["id"]
          },
        ]
      }
      session_question_responses: {
        Row: {
          ai_feedback: string | null
          ai_score: number | null
          id: string
          pre_confidence: string | null
          question_id: string
          round: number
          self_rating: string | null
          session_id: string
        }
        Insert: {
          ai_feedback?: string | null
          ai_score?: number | null
          id?: string
          pre_confidence?: string | null
          question_id: string
          round: number
          self_rating?: string | null
          session_id: string
        }
        Update: {
          ai_feedback?: string | null
          ai_score?: number | null
          id?: string
          pre_confidence?: string | null
          question_id?: string
          round?: number
          self_rating?: string | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_question_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_question_responses_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "review_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          color: string
          created_at: string | null
          id: string
          name: string
          user_id: string
        }
        Insert: {
          color: string
          created_at?: string | null
          id?: string
          name: string
          user_id: string
        }
        Update: {
          color?: string
          created_at?: string | null
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      subtopic_notes: {
        Row: {
          created_at: string | null
          id: string
          note_id: string
          subtopic_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          note_id: string
          subtopic_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          note_id?: string
          subtopic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subtopic_notes_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subtopic_notes_subtopic_id_fkey"
            columns: ["subtopic_id"]
            isOneToOne: false
            referencedRelation: "subtopics"
            referencedColumns: ["id"]
          },
        ]
      }
      subtopics: {
        Row: {
          created_at: string | null
          id: string
          last_reviewed_at: string | null
          leitner_active: boolean | null
          leitner_box: number | null
          name: string
          next_review_date: string | null
          topic_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_reviewed_at?: string | null
          leitner_active?: boolean | null
          leitner_box?: number | null
          name: string
          next_review_date?: string | null
          topic_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          last_reviewed_at?: string | null
          leitner_active?: boolean | null
          leitner_box?: number | null
          name?: string
          next_review_date?: string | null
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subtopics_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      topics: {
        Row: {
          created_at: string | null
          id: string
          name: string
          subject_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          subject_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          subject_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "topics_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      whiteboards: {
        Row: {
          created_at: string
          element_count: number
          id: string
          preview: Json
          raw_excalidraw: string | null
          scene: Json
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          element_count?: number
          id?: string
          preview?: Json
          raw_excalidraw?: string | null
          scene?: Json
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          element_count?: number
          id?: string
          preview?: Json
          raw_excalidraw?: string | null
          scene?: Json
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
