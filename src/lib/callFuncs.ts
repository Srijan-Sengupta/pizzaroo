import {
    Role,
    Transcript,
    UltravoxExperimentalMessageEvent,
    UltravoxSession,
    UltravoxSessionStatus
} from "ultravox-client";
import {CallConfig, JoinUrlResponse} from "@/lib/types";
import {updateOrderTool} from "@/lib/clienttools";

let uvSession: UltravoxSession | null = null;
const debugMessage = new Set(["debug"])

interface CallCallbacks {
    onStatusChange: (status: UltravoxSessionStatus | string | undefined) => void;
    onTranscriptChange: (transcripts: Transcript[] | undefined) => void;
    onDebugMessage?: (message: UltravoxExperimentalMessageEvent) => void;
}

export function toggleMute(role: Role): void {
    if (uvSession) {
        if (role == Role.USER)
            uvSession.isMicMuted ? uvSession.unmuteMic() : uvSession.muteMic();
        else
            uvSession.isSpeakerMuted ? uvSession.unmuteSpeaker() : uvSession.muteSpeaker();
    }
}

async function createCall(callConfig: CallConfig, showDebugMessages?: boolean): Promise<JoinUrlResponse> {
    try {
        if (showDebugMessages)
            console.log(`Using model ${callConfig.model}`);
        const response = await fetch(`/api/ultravox`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...callConfig}),
        });
        if (!response.ok) {
            const errorText = await response.text();
            new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            console.error(errorText);
        }
        const data: JoinUrlResponse = await response.json();
        if (showDebugMessages)
            console.log(`Call created. Join URL: ${data.joinUrl}`);
        return data;
    } catch (error) {
        console.error('Error creating call:', error);
    }
}

export async function startCall(callbacks: CallCallbacks, callConfig: CallConfig, showDebugMessages?: boolean): Promise<void> {
    const callData = await createCall(callConfig, showDebugMessages);
    const joinUrl = callData.joinUrl;

    if (!joinUrl && !uvSession) {
        console.error('Join URL is required');
        return;
    } else {
        console.log('Joining call:', joinUrl);
        uvSession = new UltravoxSession({ experimentalMessages: debugMessage });

        // Register our tool for order details
        uvSession.registerToolImplementation(
            "updateOrder",
            updateOrderTool
        );

        if(showDebugMessages) {
            console.log('uvSession created:', uvSession);
            console.log('uvSession methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(uvSession)));
        }

        if (uvSession) {
            uvSession.addEventListener('status', () => {
                callbacks.onStatusChange(uvSession?.status);
            });

            uvSession.addEventListener('transcripts', () => {
                callbacks.onTranscriptChange(uvSession?.transcripts);
            });

            uvSession.addEventListener('experimental_message', (msg: any) => {
                callbacks?.onDebugMessage?.(msg);
            });

            uvSession.joinCall(joinUrl);
            console.log('Session status:', uvSession.status);
        } else {
            return;
        }
    }
    console.log('Call started!');
}

export async function endCall(): Promise<void> {
    console.log('Call ended.');

    if (uvSession) {
        uvSession.leaveCall();
        uvSession = null;
    }

    // Dispatch a custom event when the call ends so that we can clear the order details form
    if (typeof window !== 'undefined') {
        const event = new CustomEvent('callEnded');
        window.dispatchEvent(event);
    }

}