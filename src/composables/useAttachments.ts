import { ref, computed } from "vue";
import axios, { AxiosResponse } from "axios";
import { useClientStore } from "@/stores/client.js";
import { Attachment } from "@/composables/interfaces";
import { usePDF } from '@tato30/vue-pdf'

interface AttachmentList {
  attachments: Attachment[];
  fileType: "image" | "pdf" | string;
}

interface AttachmentLists {
  images: AttachmentList;
  pdfs: AttachmentList;
  otherFiles: AttachmentList;
}

export default function useAttachmentManager(attachments: Attachment[]) {
  const store = useClientStore();
  const config = store.useConfig; // this object includes headers with authorizations

  const images = ref<AttachmentList>({ attachments: [], fileType: "image" });
  const pdfs = ref<AttachmentList>({ attachments: [], fileType: "pdf" });
  const otherFiles = ref<AttachmentList>({
    attachments: [],
    fileType: "other",
  });

  const getAttachmentList = (
    fileType: "image" | "pdf" | string
  ): AttachmentList => {
    switch (fileType) {
      case "image":
        return images.value;
      case "pdf":
        return pdfs.value;
      default:
        return otherFiles.value;
    }
  };

  const groupAttachmentsByFileType = (): void => {
    attachments.forEach((attachment) => {
      if (attachment.file_type === "pdf") {
        const { pdf } = usePDF(attachment.file);
        pdfs.value.attachments.push(pdf);
      } else {
        const attachmentList = getAttachmentList(attachment.file_type);
        attachmentList.attachments.push(attachment);
      }
    });
  };

  const groupAttachmentsByFileType2 = (): void => {
    attachments.forEach((attachment) => {

      const attachmentList = getAttachmentList(attachment.file_type);
      attachmentList.attachments.push(attachment);
    });
  };

  const uploadAttachment = async (
    file: File,
    fileType: "image" | "pdf",
    appointmentId: number
  ): Promise<void> => {
    const attachmentList = getAttachmentList(fileType);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("file_type", fileType);
    formData.append("appointment", appointmentId.toString());
    try {
      const response: AxiosResponse<Attachment> = await axios.post(
        "http://127.0.0.1:8000/clients/attachments/",
        formData,

        config
      );
      attachmentList.attachments.push(response.data);
    } catch (error) {
      console.error(error);
      // handle error
    }
  };

  const attachmentLists = computed<AttachmentLists>(() => ({
    images: images.value,
    pdfs: pdfs.value,
    otherFiles: otherFiles.value,
  }));

  groupAttachmentsByFileType();

  return {
    attachmentLists,
    uploadAttachment,
  };
}


// import { ref } from "vue";
// import axios, { AxiosResponse } from "axios";
// import { Attachment, AttachmentList, AttachmentLists } from "./interfaces";
// import { usePDF } from "vue3-pdf";

// export default function useAttachmentManager(attachments: Attachment[]) {
//   const images = ref<AttachmentList>({ attachments: [], fileType: "image" });
//   const pdfs = ref<AttachmentList>({ attachments: [], fileType: "pdf" });
//   const otherFiles = ref<AttachmentList>({
//     attachments: [],
//     fileType: "other",
//   });

//   const getAttachmentList = (
//     fileType: "image" | "pdf" | string
//   ): AttachmentList => {
//     switch (fileType) {
//       case "image":
//         return images.value;
//       case "pdf":
//         return pdfs.value;
//       default:
//         return otherFiles.value;
//     }
//   };

//   const groupAttachmentsByFileType = (): void => {
//     attachments.forEach((attachment) => {
//       if (attachment.file_type === "pdf") {
//         const { pdf } = usePDF(attachment.file);
//         pdfs.value.attachments.push(pdf);
//       } else {
//         const attachmentList = getAttachmentList(attachment.file_type);
//         attachmentList.attachments.push(attachment);
//       }
//     });
//   };

//   const attachmentLists = ref<AttachmentLists>({
//     images: images.value,
//     pdfs: pdfs.value,
//     otherFiles: otherFiles.value,
//   });

//   groupAttachmentsByFileType();

//   return {
//     attachmentLists,
//   };
// }

