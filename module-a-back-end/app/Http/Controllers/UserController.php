<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Http\Requests\StoreuserRequest;
use App\Http\Requests\UpdateuserRequest;
use App\Http\Resources\GameAuthorResource;
use App\Http\Resources\ScoreAuthorResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\User as AuthUser;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Sign In
     */
    public function signin(AuthRequest $request)
    {
        $request->validated($request->all());


        if (User::where('username', $request->username)->first()) {
            $user = User::where('username', $request->username)->first();

            return response()->json([
                'status' => 'success',
                'token' => $user->createToken($user->username)->plainTextToken
            ], 200);
        } else {
            return response()->json([
                "status" => "invalid",
                "message" => "Wrong username or password" 
            ], 401);
        }
    }

    /**
     * Sign Up
     */
    public function signup(AuthRequest $request)
    {
        $request->validated($request->all());

        if (User::where('username', $request->username)->first()) {
            return response()->json([
                'status' => 'invalid',
                'message' => 'Username has been already taken'
            ], 400);
        }

        $user = User::create([
            'username' => $request->username,
            'password' => $request->password
        ]);

        return response()->json([
            'status' => 'success',
            'token' => $user->createToken($user->username)->plainTextToken
        ], 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function show($username)
    {
        $user = User::where('username', $username)->first();

        if ($user) {
            return response()->json([
                'username' => $user->username,
                'registeredTimestamp' => $user->created_at,
                'authoredGames' => GameAuthorResource::collection($user->games),
                'highscores' => ScoreAuthorResource::collection($user->scores),
            ], 200);
        } else {
            return response()->json([
                "status" => "not-found",     
                "slug" => "Not found"
            ], 404);
        }
        
    }

    /**
     * Display the specified resource.
     */
    public function signout(Request $request)
    {
        Auth::user()->currentAccessToken()->delete();
        return response()->json([
            "status" => "success"
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(user $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateuserRequest $request, user $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(user $user)
    {
        //
    }
}
