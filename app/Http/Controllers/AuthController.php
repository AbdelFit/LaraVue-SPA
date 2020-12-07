<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'signup']]);
    }

    public function signup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|unique:users|email',
            'password' => 'required|min:8'
        ]);

        if($validator->fails())
						return response()->json(['error' => $validator->errors()], 401);

        $user = new User($request->all());
        $user->password = bcrypt($request->password);
        $user->save();
        
        return response()->json(['success' => 'User created!'], 200);  
		}
		
		public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'oldPassword' => 'required|min:8',
            'newPassword' => 'required|min:8'
        ]);

        if($validator->fails())
						return response()->json(['error' => $validator->errors()], 403);

				$user = Auth::user(); 
				
				if (\Hash::check($request->oldPassword, $user->password)) {
						$user->name = $request->name;
						$user->password = bcrypt($request->newPassword);
						$user->save();

						// login agin
						$credentials = [
							'email' => $user->email, 
							'password' => $request->newPassword
						];

						auth('api')->logout();

						if (! $token = auth('api')->attempt($credentials))
								return response()->json(['error' => 'Wrong email or password'], 403);
		
						return $this->respondWithToken($token);
				}

				
				return response()->json(['error' => 'Wrong password'], 403);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth('api')->attempt($credentials))
            return response()->json(['error' => 'Wrong email or password'], 401);

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth('api')->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth('api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'user' => $this->guard()->user(),
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }

    public function guard()
    {
        return Auth::guard('api');
    }
}
